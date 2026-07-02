---
title: "Async await in Python"
desc: "Python can utilize async/await keywords and event-loop to improve performance of IO-bound tasks. This article walks through the fundamentals."
category: "Python"
tags: ["Performance"]
---

## Installing `asyncio`

```bash
$ pip3 install asyncio
```

## Basic example

```python
import asyncio


async def slow_function(id: str) -> str:
    await asyncio.sleep(1)
    return f"[Done] {id}"


async def main() -> None:
    result = await slow_function("one")
    print(result)


if __name__ == "__main__":
    asyncio.run(main())
```

### Await multiple Futures

```python
# this is effectively synchronous because all Futures are awaited in sequence
async def main() -> None:
    for i in range(10):
        result = await slow_function(i)
        print(result)
```

```python
# execute and await all at once
async def main() -> None:
    results = await asyncio.gather(*[slow_function(i) for i in range(10)])
    print(results)
```

## Async generators

```python
from typing import AsyncIterable
...

# generate all results in sequence
async def generate_results(limit: int) -> AsyncIterable[str]:
    for i in range(limit):
        result = await slow_function(i)
        yield result


async def main() -> None:
    async for result in generate_results(10):
        print(result)

    # async list comprehension
    results = [result async for result in generate_results(3)]
```

## Convert synchronous functions to `async`

```python
# sync function e.g. could be sending out requests
def slow_function_sync(id: int) -> str:
    # NOTE: time.sleep block the thread, asyncio.sleep does not.
    asyncio.sleep(0.5)
    return f"[Done] {id}"


# wrapper to convert sync function into async
async def slow_function_async(id: int) -> str:
    return await asyncio.to_thread(slow_function_sync, id)


async def main() -> None:
    for i in range(4):
        # await as async
        result = await slow_function_async(i)
        print(result)
```

## Finding blocking operations

Blocking operations can kill the performance of asyncio coroutines. We can enable debug mode during development to detect blocking operations inside async functions. This will log warnings with names of functions where blocking operations are present.

```python
asyncio.run(main(), debug=True)
```


## Practical Example

```python
import asyncio
from typing import Optional
from pydantic import BaseModel
import httpx
import logging


class UserAddress(BaseModel):
    street: str
    city: str


class User(BaseModel):
    id: int
    name: str
    username: str
    email: str
    address: UserAddress


class UserRepo:
    __base_url = "https://jsonplaceholder.typicode.com/users"

    async def list_users(self) -> list[User]:
        async with httpx.AsyncClient() as client:
            res = await client.get(self.__base_url)
            raw = res.json()
            return [User(**entry) for entry in raw]

    async def find_by_id(self, id: int) -> Optional[User]:
        async with httpx.AsyncClient() as client:
            res = await client.get(f"{self.__base_url}/{id}")
            if res.status_code == 404:
                return None
            raw = res.json()
            return User(**raw)


async def main() -> None:
    # this also enabled httpx request logging.
    logging.basicConfig(level=logging.INFO)
    repo = UserRepo()
    
    # fetch first 10 in parallel.
    results = await asyncio.gather(*[repo.find_by_id(i) for i in range(1, 11)])
    for user in results:
        print(user)


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except Exception as ex:
        logging.error(ex)
```
