#!/bin/sh
# 运行数据库迁移
npx prisma migrate deploy

# 启动应用
pm2-runtime start dist/src/main.js --name "tracing-back-api"
