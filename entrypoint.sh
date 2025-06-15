#!/bin/sh

# 等待数据库就绪
echo "等待数据库连接..."
while ! nc -z database 5432; do   
  sleep 1
done
echo "数据库连接成功"

# 等待Kafka就绪
echo "等待Kafka服务..."
while ! nc -z kafka 9092; do
  sleep 1
done
echo "Kafka服务就绪"

# 运行数据库迁移
echo "运行数据库迁移..."
npx prisma migrate deploy

# 启动应用
echo "启动应用..."
node dist/src/main.js
