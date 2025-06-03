#!/bin/sh

# 部署docker
docker-compose up -d --build
echo "docker部署完成。"
# 清理旧的镜像
docker system prune -af
echo "旧镜像和无用资源已清理完毕。"