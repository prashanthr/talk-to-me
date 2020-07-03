#!/usr/bin/env bash
DEBUG=*,-socket*,-babel*,-engine:polling,-engine:ws,-engine,-express* ./node_modules/.bin/babel-node src/server/index.js
