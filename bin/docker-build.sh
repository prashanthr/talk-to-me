#!/usr/bin/env bash
# TAG_NAME=$DOCKER_REPO:$TAG_NAME
if [ -z $TAG ]; then 
  TAG="talk-to-me:dev"
fi

# config setup
cp ./config/secrets/client/index.js ./src/client/config/
cp ./config/secrets/server/default.json ./config/default.json

echo "Building docker image with tag $TAG..."
docker build -t $TAG .

# Reset config
git checkout ./src/client/config/
git checkout ./config/default.json
