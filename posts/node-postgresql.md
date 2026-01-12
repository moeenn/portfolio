---
title: "PostgreSQL in Node"
desc: "PostgreSQL is one of the most advanced RDBMS available. It has all the features any application could ever need. Here is how to use it in Node"
category: "Javascript"
tags: ["Database", "Typescript", "Node"]
---

## Installing dependencies

```bash
$ npm i pg
$ npm i -D @types/pg node-pg-migrate dotenv
```

**Note**: `dotenv` is an indirect dependency of `node-pg-migrate`. It is required because we will be loading database URL from `.env` file

```
# dont change name; this is automatically picked up by node-pg-migrate
DATABASE_URL=postgres://devuser:devpass@localhost:5432/dev
```

### Setting up useful scripts in `package.json`

```json
{
	"scripts": {
		"db:migrate": "node-pg-migrate --envPath=.env up",
		"db:migration": "node-pg-migrate create -j sql"
	}
}
```

**Note**: By default, all migrations will be placed inside `migrations` directory.

```bash
# create file for a new migration
npm run db:migration <migration_name>
```

## Defining and running migrations

```sql
-- Up Migration
create type user_role as enum('admin', 'user');

create table
  users (
    id uuid
    , email text not null
    , password text not null
    , role user_role not null default 'user'
    , "isActive" boolean not null default true
    , "createdAt" timestamp not null default now()
    , "deletedAt" timestamp null
    , primary key (id)
    , constraint email_unique unique (email)
  )

-- Down Migration
drop table users;
drop type user_role;
```

```bash
# apply the migration
npm run db:migrate
```

## Basic example

The following basic code will get us started.

```ts
import { Pool } from "pg"
import assert from "node:assert/strict"

class DatabaseConfig {
    public readonly url: string

    constructor(env: Record<string, string> | NodeJS.ProcessEnv) {
        const conn = env["DATABASE_URL"]
        assert(conn != undefined)
        this.url = conn
    }
}

class Database {
    #pool: Pool

    constructor(config: DatabaseConfig) {
        this.#pool = new Pool({
            connectionString: config.url,
        })
    }

    async ping(): Promise<boolean> {
        const result = await this.#pool.query("select 1");
        return result.rowCount == 1;
    }

    get conn() {
        assert(this.#pool != null)
        return this.#pool;
    }

    async disconnect() {
        await this.#pool.end();
    }
}

async function main(): Promise<void> {
    const dbConfig = new DatabaseConfig(process.env)
    const db = new Database(dbConfig)
    assert(await db.ping())
    console.log("-- connection established --")

    await db.disconnect()
    console.log("-- disconnected --")
}

main().catch(console.error)
```

Above code is a bit too basic. Notably, it is missing the following functionalities:
1. Named query support
1. Better transactions

Let's add these in.


### Named queries

So why do we even need named queries? Look at the following code which you will generally find with `pg`.

```ts
async function createUser(db: Database, user: UserEntity) {
    const query = `
        insert into users (id, email, password, role, "isActive", "createdAt")
        values ($1, $2, $3, $4, $5, $6)
    `

    await db.conn.query(query, [
        user.id,
        user.email,
        user.password,
        user.role,
        user.isActive,
        user.createdAt,
    ])
}
```

The above code gives me anxiety. It is very error-prone and not at all fun to work with. We can do better. With named queries, the above code will look as follows.

```ts
async function createUser(db: Database, user: UserEntity) {
    const query = `
        insert into users (id, email, password, role, "isActive", "createdAt")
        values (:id, :email, :password, :role, :isActive, :createdAt)
    `

    await db.conn.query(query, user)
}
```

There. That's much better. Now lets implement it.


```ts
interface Stringable {
    toString(): string
}

export type NamedArgs = {
    [x: string]: Stringable | Date | null;
}
export type ParamType = string | null

export class NamedQueryResult {
    public readonly preparedQuery: string
    public readonly params: ParamType[]

    constructor(preparedQuery: string, params: ParamType[]) {
        this.preparedQuery = preparedQuery
        this.params = params
    }
}

export class MissingArgumentError extends Error {
    public readonly arg: string

    constructor(arg: string) {
        super("missing sql query argument: " + arg)
        this.arg = arg
    }
}

function namedArray(values: ParamType[], offset: number): string {
    const pieces: string[] = []
    for (let i = 0; i < values.length; i++) {
        pieces.push(`$${offset + i}`)
    }

    return pieces.join(", ")
}

export function named(query: string, args: NamedArgs): NamedQueryResult {
    const params = [...query.matchAll(/:([a-zA-Z_][a-zA-Z0-9_]*)/g)].map((match) =>
        match[0].slice(1),
    )

    const paramsSet = new Set(params)
    const paramArray: ParamType[] = []
    let idx = 1

    for (const param of paramsSet) {
        const paramValue = args[param]
        if (paramValue === undefined) {
            throw new MissingArgumentError(param)
        }

        if (Array.isArray(paramValue)) {
            const replaceValue = namedArray(paramValue, idx)
            query = query.replaceAll(`:${param}`, replaceValue)
            paramArray.push(...paramValue)
            idx += paramValue.length
            continue
        }

        query = query.replaceAll(`:${param}`, `$${idx}`)
        if (paramValue === null) {
            paramArray.push(null)
        }

        if (paramValue != null) {
            if (paramValue instanceof Date) {
                paramArray.push(paramValue.toISOString())
            } else {
                paramArray.push(paramValue.toString())
            }
        }

        idx++
    }

    return new NamedQueryResult(query.trim(), paramArray)
}
```

We will also update the `Database` class as follows:

```ts
class Database {
	...
	async namedQuery(query: string, args: NamedArgs) {
        const q = named(query, args)
        return await this.#pool.query(q.preparedQuery, q.params)
    }
}
```

### Define entities and repositories

```ts
import { z } from "zod"

const UserEntitySchema = z.object({
    id: z.uuid(),
    email: z.email(),
    password: z.string(),
    role: z.enum(["admin", "user"]),
    isActive: z.boolean(),
    createdAt: z.date(),
    deletedAt: z.date().nullable(),
})

type UserEntity = z.infer<typeof UserEntitySchema>

class UserRepo {
    handleConstraintViolations(err: DatabaseError) {
        switch (err.constraint) {
            case "email_unique":
                throw new Error("email address already in use");
        }
    }

    #createUserQuery = `
        insert into users (id, email, password, role, "isActive", "createdAt")
        values (:id, :email, :password, :role, :isActive, :createdAt)
    `

    async createUser(db: Database, user: UserEntity) {
        try {
            await db.namedQuery(this.#createUserQuery, user)
        } catch (err) {
            if (err instanceof DatabaseError) {
                this.handleConstraintViolations(err)
            }
            throw err;
        }
    }

    #findByIdQuery = `
        select * from users
        where id = :id
        limit 1
    `

    async findById(db: Database, id: string): Promise<UserEntity | null> {
        const result = await db.namedQuery(this.#findByIdQuery, { id })
        if (result.rowCount === 0) {
            return null
        }

        return UserEntitySchema.parse(result.rows[0])
    }

    #updateUserQuery = `
        update users
        set email = :email,
            password = :password,
            role = :role,
            "isActive" = :isActive,
            "createdAt" = :createdAt,
            "deletedAt" = :deletedAt
        where id = :id        
    `

    async updateUser(db: Database, user: UserEntity) {
        try {
            await db.namedQuery(this.#updateUserQuery, user)
        } catch (err) {
            if (err instanceof DatabaseError) {
                this.handleConstraintViolations(err)
            }
            throw err;
        }
    }

    #deleteUserQuery = `
        delete from users
        where id = :id
    `

    async deleteUser(db: Database, id: string) {
        await db.namedQuery(this.#deleteUserQuery, { id })
    }
}
```

### CRUD example

```ts
// create user.
const newUser: UserEntity = {
	id: crypto.randomUUID().toString(),
	email: "admin@site.com",
	password: "my-strong-password",
	role: "admin",
	isActive: true,
	createdAt: new Date(),
	deletedAt: null,
}

await userRepo.createUser(db, newUser)
```

```ts
// update user.
const updatedUser: UserEntity = {
	id: "d5b05464-6719-4061-bee1-b782898d6a3c",
	email: "admin-updated@site.com",
	password: "my-strong-password",
	role: "admin",
	isActive: false,
	createdAt: new Date(),
	deletedAt: null,
}

await userRepo.updateUser(db, updatedUser)
```

```ts
// find user.
const foundUser = await userRepo.findById(db, "d5b05464-6719-4061-bee1-b782898d6a3c")
```

```ts
// delete user.
await userRepo.deleteUser(db, "d5b05464-6719-4061-bee1-b782898d6a3c")
```

### Transactions

```ts
export interface IDatabase {
    query(query: string, values: any[]): Promise<QueryResult<any>>
    namedQuery(query: string, args: NamedArgs): Promise<QueryResult<any>>
}

class Transaction implements IDatabase {
    #client: PoolClient

    constructor(client: PoolClient) {
        this.#client = client
    }

    async commit() {
        this.#client.query("commit")
    }

    async rollback() {
        this.#client.query("rollback")
    }

    release() {
        this.#client.release()
    }

    query(query: string, values: any[]): Promise<QueryResult<any>> {
        return this.#client.query(query, values)
    }

    namedQuery(query: string, args: NamedArgs): Promise<QueryResult<any>> {
        const q = named(query, args)
        return this.#client.query(q.preparedQuery, q.params)
    }
}
```

We will update the `Database` class and add the following method for initiating transactions.

```ts
class Database implements IDatabase {
	...
	async transaction(callback: (tx: Transaction) => Promise<void>) {
        const handle = await this.#pool.connect()
        await handle.query("begin")
        const tx = new Transaction(handle)

        try {
            await callback(tx)
            await tx.commit()
        } catch (err) {
            await tx.rollback()
            throw err;
        } finally {
            tx.release();
        }
    }
}
```

Our `Database` and `Transaction` classes both implement the `IDatabase` interface. This means, now we can define our repository methods to be able to accept both `Database` and `Transaction` types.

```ts
class UserRepo {
    ...
    async createUser(db: IDatabase, user: UserEntity) {
        ...
    }
    ...
}
```

## Conclusion

The abstractions we have created now look like this. 

```ts
import { Pool, type PoolClient, type QueryResult } from "pg"
import assert from "node:assert/strict"

interface Stringable {
    toString(): string
}

type NamedArgs = {
    [x: string]: Stringable | Date | null;
}
type ParamType = string | null

export class NamedQueryResult {
    public readonly preparedQuery: string
    public readonly params: ParamType[]

    constructor(preparedQuery: string, params: ParamType[]) {
        this.preparedQuery = preparedQuery
        this.params = params
    }
}

export class MissingArgumentError extends Error {
    public readonly arg: string

    constructor(arg: string) {
        super("missing sql query argument: " + arg)
        this.arg = arg
    }
}

function namedArray(values: ParamType[], offset: number): string {
    const pieces: string[] = []
    for (let i = 0; i < values.length; i++) {
        pieces.push(`$${offset + i}`)
    }

    return pieces.join(", ")
}

function named(query: string, args: NamedArgs): NamedQueryResult {
    const params = [...query.matchAll(/:([a-zA-Z_][a-zA-Z0-9_]*)/g)].map((match) =>
        match[0].slice(1),
    )

    const paramsSet = new Set(params)
    const paramArray: ParamType[] = []
    let idx = 1

    for (const param of paramsSet) {
        const paramValue = args[param]
        if (paramValue === undefined) {
            throw new MissingArgumentError(param)
        }

        if (Array.isArray(paramValue)) {
            const replaceValue = namedArray(paramValue, idx)
            query = query.replaceAll(`:${param}`, replaceValue)
            paramArray.push(...paramValue)
            idx += paramValue.length
            continue
        }

        query = query.replaceAll(`:${param}`, `$${idx}`)
        if (paramValue === null) {
            paramArray.push(null)
        }

        if (paramValue != null) {
            if (paramValue instanceof Date) {
                paramArray.push(paramValue.toISOString())
            } else {
                paramArray.push(paramValue.toString())
            }
        }

        idx++
    }

    return new NamedQueryResult(query.trim(), paramArray)
}


export interface IDatabase {
    query(query: string, values: any[]): Promise<QueryResult<any>>
    namedQuery(query: string, args: NamedArgs): Promise<QueryResult<any>>
}

export class DatabaseConfig {
    public readonly url: string

    constructor(env: Record<string, string> | NodeJS.ProcessEnv) {
        const conn = env["DATABASE_URL"]
        assert(conn != undefined)
        this.url = conn
    }
}

export class Transaction implements IDatabase {
    #client: PoolClient

    constructor(client: PoolClient) {
        this.#client = client
    }

    async commit() {
        this.#client.query("commit")
    }

    async rollback() {
        this.#client.query("rollback")
    }

    release() {
        this.#client.release()
    }

    query(query: string, values: any[]): Promise<QueryResult<any>> {
        return this.#client.query(query, values)
    }

    namedQuery(query: string, args: NamedArgs): Promise<QueryResult<any>> {
        const q = named(query, args)
        return this.#client.query(q.preparedQuery, q.params)
    }
}

export class Database implements IDatabase {
    #pool: Pool

    constructor(config: DatabaseConfig) {
        this.#pool = new Pool({
            connectionString: config.url,
        })
    }

    async ping(): Promise<boolean> {
        const result = await this.#pool.query("select 1");
        return result.rowCount == 1;
    }

    get conn() {
        assert(this.#pool != null)
        return this.#pool;
    }

    async transaction(callback: (tx: Transaction) => Promise<void>) {
        const handle = await this.#pool.connect()
        await handle.query("begin")
        const tx = new Transaction(handle)

        try {
            await callback(tx)
            await tx.commit()
        } catch (err) {
            await tx.rollback()
            throw err;
        } finally {
            tx.release();
        }
    }

    async query(query: string, args: any[]): Promise<QueryResult<any>> {
        return await this.#pool.query(query, args)
    }

    async namedQuery(query: string, args: NamedArgs): Promise<QueryResult<any>> {
        const q = named(query, args)
        return await this.#pool.query(q.preparedQuery, q.params)
    }

    async disconnect() {
        await this.#pool.end();
    }
}
```
