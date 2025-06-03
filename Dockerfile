# === 通用基础镜像 ===
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app


# === API 构建阶段 ===
FROM base AS api-builder

WORKDIR /app/api

# 优先复制依赖文件，利用缓存
COPY api/package.json api/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# 再复制源码
COPY api/ ./

# 生成 Prisma Client（生成到 node_modules/.prisma）
RUN pnpm prisma:generate

# 构建 NestJS 应用
RUN pnpm build


# === Web 构建阶段 ===
FROM base AS web-builder

WORKDIR /app/web

COPY web/package.json web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY web/ ./

# 构建前端应用
ENV NODE_ENV=production
ENV VITE_API_URL=/api
RUN pnpm build


# === Nginx 阶段 ===
FROM nginx:alpine AS nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=web-builder /app/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# === API 运行阶段（生产环境）===
FROM node:20-alpine AS api-production
WORKDIR /app

# 复制生产依赖（包含 NestJS 编译后的 dist 和 Prisma Client）
COPY --from=api-builder /app/api/package.json ./
COPY --from=api-builder /app/api/pnpm-lock.yaml ./
COPY --from=api-builder /app/api/node_modules ./node_modules
COPY --from=api-builder /app/api/dist ./dist
COPY --from=api-builder /app/api/prisma ./prisma

# 复制启动脚本
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 3000