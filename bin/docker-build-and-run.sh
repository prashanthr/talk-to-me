#!/usr/bin/env bash
if [ -z $CONTAINER_NAME ]; then 
  CONTAINER_NAME="talk-to-me"
fi

if [ -z $TAG_NAME ]; then 
  TAG_NAME="dev" #$(uuidgen)
fi

NAME_TAG="$CONTAINER_NAME:$TAG_NAME"

TAG=$NAME_TAG ./bin/docker-build.sh && \
CONTAINER_NAME=$CONTAINER_NAME TAG=$NAME_TAG ./bin/docker-run.sh
