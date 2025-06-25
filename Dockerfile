# === 通用基础镜像 ===
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app

# === 依赖安装阶段（统一安装所有 workspace 依赖）===
FROM base AS deps-installer

# 复制 workspace 配置文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/
COPY web/package.json ./web/

# 利用 pnpm workspace 统一安装所有依赖（充分利用依赖去重）
RUN pnpm install --frozen-lockfile

# === API 构建阶段 ===
FROM deps-installer AS api-builder

# 复制 API 源码
COPY api/ ./api/

# 生成 Prisma Client
WORKDIR /app/api
RUN pnpm prisma:generate

# 构建 NestJS 应用
RUN pnpm build

# === Web 构建阶段 ===
FROM deps-installer AS web-builder

# 复制 Web 源码
COPY web/ ./web/

# 构建前端应用
WORKDIR /app/web
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

# 复制生产依赖（从统一安装的依赖中复制，避免重复）
COPY --from=api-builder /app/api/package.json ./
COPY --from=api-builder /app/api/pnpm-lock.yaml ./
COPY --from=api-builder /app/api/node_modules ./node_modules
COPY --from=api-builder /app/api/dist ./dist
COPY --from=api-builder /app/api/prisma ./prisma

# 复制 workspace 配置（运行时可能需要）
COPY package.json pnpm-workspace.yaml ./

WORKDIR /app/api

# 复制启动脚本到正确位置
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
EXPOSE 3000