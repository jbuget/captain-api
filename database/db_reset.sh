#!/usr/bin/env bash

docker stack rm captain-api
docker stack deploy granny -c stack.yml
