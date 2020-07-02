#!/usr/bin/env bash
if [ -z $CONTAINER_NAME ]; then 
  CONTAINER_NAME="talk-to-me"
fi

if [ -z $TAG_NAME ]; then 
  TAG_NAME="latest"
fi

# docker build and release
NAME_TAG="$DOCKER_USER/$CONTAINER_NAME:$TAG_NAME"

TAG=$NAME_TAG ./bin/docker-build.sh && \
DOCKER_USER=$DOCKER_USER TAG=$NAME_TAG ./bin/docker-release.sh
