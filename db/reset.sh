#!/usr/bin/env bash

docker stack rm captain-api
docker stack deploy captain-api -c stack.yml
sleep 3
npx knex migrate:latest
npx knex seed:run
