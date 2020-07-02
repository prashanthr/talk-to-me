#!/usr/bin/env bash
echo "Deploying docker image for user $DOCKER_USER and tag $TAG..."
docker push $TAG
