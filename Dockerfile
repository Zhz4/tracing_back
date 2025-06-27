# === 通用基础镜像 ===
FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app


# === API 构建阶段 ===
FROM base AS api-builder

RUN npm install -g pnpm pm2

WORKDIR /app/api

# 优先复制依赖文件，利用缓存
COPY api/package.json ./ 
COPY pnpm-lock.yaml pnpm-workspace.yaml ../ 
COPY package.json ../

# 安装依赖（在 workspace 中只针对 api 安装）
RUN pnpm install --frozen-lockfile --filter api

# 再复制源码
COPY api/ ./

# 生成 Prisma Client（生成到 node_modules/.prisma）
RUN pnpm prisma:generate

# 构建 NestJS 应用
RUN pnpm build

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

# === Web 构建阶段 ===
FROM base AS web-builder

WORKDIR /app/web

# ✅ 复制 monorepo 所需文件
COPY pnpm-lock.yaml pnpm-workspace.yaml ../
COPY package.json ../
COPY web/package.json ./ 

# ✅ 安装 Web 的依赖（在完整 workspace 环境中安装）
RUN pnpm install --frozen-lockfile --filter web

# ✅ 再复制 Web 源码
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

EXPOSE 3000