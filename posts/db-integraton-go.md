---
title: "Databse Integration in Go"
desc: "Every Golang service needs some form of database integration. This post walks through integrating PostgreSQL in a Golang application using SQLx."
category: "Golang"
tags: ["Back-end", "Database"]
---

## Advantages of SQLx

- Very simple setup, which is very similar to built-in `database/sql` package, with a lot of quality-of-life improvements.
- Supports named queries, lack of which can be a source of bugs for queries with large number of parameters.
- Suports scaning database rows directly into structs, reducing boiler-plate code.


## Basic Setup and Imports 

```go
package main

import (
  "context"
	"errors"
	"fmt"
	"log/slog"
	"os"
  
	"github.com/google/uuid"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

// IMPORTANT: always read from env, NEVER hardcode.
const DB_URI string = "postgresql://user:pass@localhost:5432/db?sslmode=disable"

func run(ctx context.Context) error {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	db, err := sqlx.Open("postgres", DB_URI)
	if err != nil {
		return fmt.Errorf("failed to open database connection: %w", err)
	}
	//nolint:errcheck
	defer db.Close()

	if err := db.PingContext(ctx); err != nil {
		return fmt.Errorf("failed to ping database: %w", err)
	}

	logger.Info("connection established")
	return nil
}

func main() {
	ctx := context.Background()
	if err := run(ctx); err != nil {
		fmt.Fprintf(os.Stderr, "error: %s\n", err.Error())
		os.Exit(1)
	}
}
```

## Adding Records 

```go
func ID() uuid.UUID {
    // uuiv6 has better than uuidv4 for lookup performance.
	return uuid.Must(uuid.NewV6())
}

type UserEntity struct {
	Id    uuid.UUID `db:"id"`
	Email string    `db:"email"`
	Name  string    `db:"name"`
}

func addUsers(db *sqlx.DB, users []UserEntity) error {
	const query string = `
		insert into users (id, email, name)
		values (:id, :email, :name)
	`

    // IMPORTANT: NamedExec supports batch inserts.
	if _, err := db.NamedExec(query, users); err != nil {
		slog.Error("failed to add user", "error", err.Error())
		return errors.New("failed to add user")
	}

	return nil
}
```

**Notes** 

- If insert statement does not use named variables, we can use `db.Exec` instead.
- In the above function, defining the query outside of the function may be preferred from maintainability perspective.

## Query data

```go
type listUsersResult struct {
	UserEntity
	Total int `db:"total_count"`
}

func listUsers(db *sqlx.DB, limit, offset int) ([]UserEntity, int, error) {
	const query string = `
		select
			u.*,
			count(*) over() as total_count
		from users u
		limit $1
		offset $2
	`

	var results []listUsersResult

    // IMPORTANT: Select does NOT support named queries.
    // IMPORTANT: Select ONLY SUPPORTS writing into slices / arrays.
	if err := db.Select(&results, query, limit, offset); err != nil {
		slog.Error("failed to list users", "error", err.Error())
		return nil, 0, errors.New("failed to list users")
	}

	if len(results) == 0 {
		return []UserEntity{}, 0, nil
	}

	users := make([]UserEntity, len(results))
	for i, u := range results {
		users[i] = u.UserEntity
	}

	return users, results[0].Total, nil
}
```

### Query data with named parameters

```go
type LimitOffset struct {
	Limit  int `db:"limit"`
	Offset int `db:"offset"`
}

func listUsersNamed(db *sqlx.DB, args LimitOffset) ([]UserEntity, int, error) {
	const query string = `
		select
			u.*,
			count(*) over() as total_count
		from users u
		limit :limit
		offset :offset
	`

	prepared, err := db.PrepareNamed(query)
	if err != nil {
		slog.Error("failed to prepare listUsers query", "error", err.Error())
		return nil, 0, errors.New("failed to list users")
	}

	var results []listUsersResult
	if err := prepared.Select(&results, args); err != nil {
		slog.Error("failed to list users", "error", err.Error())
		return nil, 0, errors.New("failed to list users")
	}

	if len(results) == 0 {
		return []UserEntity{}, 0, nil
	}

	users := make([]UserEntity, len(results))
	for i, u := range results {
		users[i] = u.UserEntity
	}

	return users, results[0].Total, nil
}
```

### Looking up individual records

```go
func findUserById(db *sqlx.DB, id string) (*UserEntity, error) {
	const query string = `
		select * from users
		where id = $1
	`

	var user UserEntity
  
    // IMPORTANT: Get does NOT support writing into slices / arrays.
	if err := db.Get(&user, query, id); err != nil {
		slog.Error("failed to find user by id", "error", err.Error())
		return nil, errors.New("failed to find user")
	}

	return &user, nil
}
```

## Deleting records 

```go
func deleteUser(db *sqlx.DB, id string) error {
	const query string = `
		delete from users
		where id = $1
	`

	if _, err := db.Exec(query, id); err != nil {
		slog.Error("failed to delete user", "error", err.Error())
		return errors.New("failed to delete user")
	}

	return nil
}
```

## Summary

- Named queries are preferred when inserting, updating records. This is because entities can be very large with many fields. Placeholder parameters would be error-prone in this case.
- When querying multiple records, `db.Select` is preferred. If we have named parameters in our query, then a combination of `db.PrepareNamed` and `prepared.Select` should be used.
- When querying a single record, `db.Get` is preferred.
- For all update operations, either `db.Exec` or `db.NamedExec` are used. 
