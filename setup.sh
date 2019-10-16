#!/usr/bin/env bash

# Prerequisites

echo 'Check prerequisites…'

check_command () {
    if ! [ -x "$(command -v $1)" ]; then
      echo "Error: ${1} is not installed." >&2
      exit 1
    fi
}

commands=( docker git node npm vue )

for i in "${commands[@]}" ; do check_command ${i} ; done

echo 'Prerequisites checked.'


# Database

echo 'Setup database…'

cd db
./reset.sh
cd ..

echo 'Database configured'


# API

echo 'Setup API…'

cd api
npm install --no-optionnal
cd ..

echo 'API configured'

# Web client

echo 'Setup Web client'

cd web
npm install --no-optionnal
cd ..

echo 'Web client configured'
