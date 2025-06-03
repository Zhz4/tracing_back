# 使用 Node.js 20 作为基础镜像
FROM node:20-alpine AS base

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# ==================== API 构建阶段 ====================
FROM base AS api-builder

# 复制 API 项目文件
COPY api/package.json api/pnpm-lock.yaml ./api/

# 安装依赖
WORKDIR /app/api
RUN pnpm install

# 复制源码并构建
COPY api/ ./
RUN pnpm prisma:generate
RUN pnpm build

# ==================== Web 构建阶段 ====================
FROM base AS web-builder

# 复制 Web 项目文件
COPY web/package.json web/pnpm-lock.yaml ./web/

# 安装依赖
WORKDIR /app/web
RUN pnpm install

# 复制源码
COPY web/ ./

# 设置生产环境变量
ENV NODE_ENV=production
ENV VITE_API_URL=/api

# 构建应用
RUN pnpm build

# ==================== Nginx 阶段 ====================
FROM nginx:alpine AS nginx

# 复制 Nginx 配置和前端文件
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=web-builder /app/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ==================== API 生产阶段 ====================
FROM node:20-alpine AS api-production

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制构建结果和依赖
COPY --from=api-builder /app/api/package.json ./
COPY --from=api-builder /app/api/pnpm-lock.yaml ./
COPY --from=api-builder /app/api/dist ./dist
COPY --from=api-builder /app/api/prisma ./prisma
COPY --from=api-builder /app/api/node_modules/.prisma ./node_modules/.prisma

# 安装生产依赖
RUN pnpm install --prod

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start:prod"]
