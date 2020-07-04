#!/usr/bin/env bash
if [ -z $DOCKER_PORT ]; then
  DOCKER_PORT=9000
fi

echo "Running docker container with tag $TAG and name $CONTAINER_NAME at port $DOCKER_PORT..."
docker run  --name $CONTAINER_NAME -p $DOCKER_PORT:$DOCKER_PORT --rm $TAG
