# granny-db

## DB provisionning

```
docker swarm init # (if not already done)
docker stack deploy -c database/stack.yml granny
docker stack rm granny && npm run db:init
```

Wait. Browse http://localhost:8080.

| Param    | Value      |
|----------|------------|
| System   | PostgreSQL |
| Server   | db         |
| User     | postgres   |
| Password | example    |
| Database | postgres   |

## DB migrations

```
knex migrate:make <migration_name>
knex migrate:latest
knex seed:make users
knex seed:run
```