#!/bin/sh
export COMPOSE_BAKE=true
# 部署docker
docker compose up -d --build
echo "docker部署完成。"