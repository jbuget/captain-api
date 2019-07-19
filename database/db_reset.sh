#!/usr/bin/env bash

docker stack rm granny
docker stack deploy granny -c stack.yml
