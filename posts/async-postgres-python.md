---
title: "PostgreSQL and Async Python"
desc: "Any Python web service will need database integration, and what better database than PostgreSQL. To access the DB in a reasonably efficient manner, asyncio is needed. Here we walk through the common use-case."
category: "Python"
tags: ["Back-end", "Database", "Performance"]
---


## Installing packages

```bash
$ pip install asyncio asyncpg pydantic
```

## Establishing connection

```python
import asyncio
import logging
import asyncpg
from asyncpg import Pool


async def main() -> None:
    db_config = DbConfig()

    # use asyncpg.connect for single connection.
    db: Pool = await asyncpg.create_pool(
        host=db_config.host,
        database=db_config.database,
        user=db_config.user,
        password=db_config.password,
        min_size=db_config.min_pool_size,
        max_size=db_config.max_pool_size,
    )
    logging.info("database connection established")


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    try:
        asyncio.run(main(), debug=True)
    except Exception as ex:
        logging.error(ex)
```

## Defining Models and Repos

Consider the following SQL schema. We will be using this schema for examples.

```sql
create table reviews (
  review_id uuid primary key
  , public_review text not null
  , private_review text null
  , rating int not null
  , submitted_at timestamp not null
);
```

```python
from pydantic import BaseModel
from uuid import UUID


class ReviewModel(BaseModel):
    review_id: UUID
    public_review: str
    private_review: str | None
    rating: int
    submitted_at: datetime
    

class ReviewWithTotalCount(ReviewModel):
    total_count: int

    def to_review(self) -> ReviewModel:
        return ReviewModel(**self.model_dump())
```

```python
class ReviewsRepo:
    __db: Pool

    def __init__(self, db: Pool) -> None:
        self.__db = db

    __create_review_query = """
        insert into reviews 
            (review_id, public_review, private_review, rating, submitted_at)
        values 
            ($1, $2, $3, $4, $5) 
    """

    async def create_review(self, r: ReviewModel) -> None:
        await self.__db.execute(
            self.__create_review_query,
            r.review_id,
            r.public_review,
            r.private_review,
            r.rating,
            r.submitted_at,
        )

    __count_reviews_query = """
        select count(*) from reviews        
    """

    async def count_reviews(self) -> int:
        count = await self.__db.fetchval(self.__count_reviews_query)
        return count

    __list_reviews_query = """
        select * from reviews 
    """

    async def list_reviews(self) -> list[ReviewModel]:
        rows = await self.__db.fetch(self.__list_reviews_query)
        return [ReviewModel(**row) for row in rows]

    __list_review_paginated_query = """
        select
            rv.*,
            count(*) over() as total_count
        from reviews rv
        limit $1
        offset $2 
    """

    async def list_reviews_paginated(
        self, limit=10, offset=0
    ) -> Tuple[list[ReviewModel], int]:
        rows = await self.__db.fetch(self.__list_review_paginated_query, limit, offset)
        parsed = [ReviewWithTotalCount(**row) for row in rows]
        if len(parsed) == 0:
            return ([], 0)

        count = parsed[0].total_count
        return ([review.to_review() for review in parsed], count)

    __find_review_by_id_query = """
      select * from reviews
      where review_id = $1  
    """

    async def find_review_by_id(self, review_id: UUID) -> Optional[ReviewModel]:
        row = await self.__db.fetchrow(self.__find_review_by_id_query, review_id)
        if row is None:
            return None
        return ReviewModel(**row)

    __update_review_query = """
       update reviews
       set public_review = $2,
           private_review = $3,
           rating = $4,
           submitted_at = $5
       where review_id = $1 
    """

    async def update_review(self, r: ReviewModel) -> None:
        await self.__db.execute(
            self.__update_review_query,
            r.review_id,
            r.public_review,
            r.private_review,
            r.rating,
            r.submitted_at,
        )

    __delete_review_query = """
        delete from reviews
        where review_id = $1  
    """

    async def delete_review(self, review_id: UUID) -> None:
        await self.__db.execute(self.__delete_review_query, review_id)
```

**Note**: `asyncpg` does not support named parameters in queries.