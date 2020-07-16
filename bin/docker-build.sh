#!/usr/bin/env bash
# TAG_NAME=$DOCKER_REPO:$TAG_NAME
if [ -z $TAG ]; then 
  TAG="talk-to-me:dev"
fi

# config setup
echo "Setting up config..."
cp ./config/secrets/client/index.js ./src/client/config/

echo "Building docker image with tag $TAG..."
docker build -t $TAG .

# Reset config
echo "Resetting config..."
git checkout ./src/client/config/
