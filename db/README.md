# granny-db

## DB provisionning

```
docker swarm init # (if not already done)
docker stack deploy -c database/stack.yml captain-api
docker stack rm captain-api
```

Wait. Browse http://localhost:8080.

| Param    | Value      |
|----------|------------|
| System   | PostgreSQL |
| Server   | db         |
| User     | postgres   |
| Password | example    |
| Database | granny     |

## DB migrations

```
knex migrate:make <migration_name>
knex migrate:latest
knex seed:make users
knex seed:run
```