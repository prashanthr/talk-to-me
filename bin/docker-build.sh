#!/usr/bin/env bash
if [ -z $TAG ]; then 
  TAG="talk-to-me:dev"
fi

echo "Building docker image with tag $TAG..."
docker build -t $TAG .
