# Docker 部署指南

这是一个包含 NestJS API、React Web 应用、Nginx、PostgreSQL 和 Redis 的完整 Docker 部署方案。

## 🏗️ 架构概览

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │───▶│    Nginx    │───▶│  NestJS API │
└─────────────┘    │  (port 80)  │    │ (port 3000) │
                   │             │    └─────────────┘
                   │ Static Files│           │
                   │ (React App) │           │
                   └─────────────┘           │
                                            │
                   ┌─────────────┐          │
                   │ PostgreSQL  │◀─────────┤
                   │ (port 5432) │          │
                   └─────────────┘          │
                                            │
                   ┌─────────────┐          │
                   │    Redis    │◀─────────┘
                   │ (port 6379) │
                   └─────────────┘
```

## 📦 服务组件

- **Nginx**: 反向代理、静态文件服务、负载均衡
- **NestJS API**: 后端 API 服务
- **React Web**: 前端应用（构建后的静态文件）
- **PostgreSQL**: 主数据库
- **Redis**: 缓存和会话存储

## 🚀 快速开始

### 1. 环境配置

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑环境变量（重要：修改密码和密钥）
vim .env
```

### 2. 生产环境部署

```bash
# 构建并启动所有服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 3. 开发环境部署

```bash
# 使用开发配置启动
docker-compose -f docker-compose.dev.yml up -d --build

# 开发模式会暴露数据库和 Redis 端口便于调试
```

## 🌐 访问地址

### 生产环境

- **Web 应用**: http://localhost
- **API 文档**: http://localhost/docs
- **健康检查**: http://localhost/health

### 开发环境

- **Web 应用**: http://localhost:8080
- **API 直接访问**: http://localhost:3000
- **API 文档**: http://localhost:3000/docs
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🛠️ 常用命令

### 服务管理

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 重启特定服务
docker-compose restart app

# 查看实时日志
docker-compose logs -f app

# 进入容器
docker-compose exec app sh
docker-compose exec database psql -U postgres -d tracing_db
```

### 数据库操作

```bash
# 运行数据库迁移
docker-compose exec app pnpm prisma:migrate

# 生成 Prisma 客户端
docker-compose exec app pnpm prisma:generate

# 打开 Prisma Studio
docker-compose exec app pnpm prisma:studio
```

### 构建和部署

```bash
# 仅重新构建 API
docker-compose build app

# 仅重新构建前端
docker-compose build nginx

# 清理未使用的镜像
docker system prune

# 查看磁盘使用
docker system df
```

## 📁 目录结构

```
.
├── api/                    # NestJS API 代码
├── web/                    # React Web 代码
├── logs/                   # 日志文件目录
│   ├── nginx/             # Nginx 访问日志
│   ├── api/               # API 应用日志
│   └── postgres/          # PostgreSQL 日志
├── Dockerfile             # 多阶段构建配置
├── nginx.conf             # Nginx 配置文件
├── docker-compose.yml     # 生产环境配置
├── docker-compose.dev.yml # 开发环境配置
├── .dockerignore          # Docker 忽略文件
└── .env.example           # 环境变量模板
```

## 🔧 配置说明

### Nginx 配置特性

- **Gzip 压缩**: 减少传输大小
- **静态文件缓存**: 优化加载性能
- **反向代理**: API 请求转发到后端
- **安全头**: 基本的安全防护
- **健康检查**: 自动检查后端状态

### 环境变量

确保在 `.env` 文件中配置以下关键变量：

```env
# 数据库连接
DATABASE_URL=postgresql://postgres:your-password@database:5432/tracing_db

# JWT 密钥（请生成强密码）
JWT_SECRET=your-super-secret-jwt-key

# 数据库密码
POSTGRES_PASSWORD=your-strong-password
```

## 🔍 故障排除

### 常见问题

1. **端口冲突**

   ```bash
   # 检查端口占用
   netstat -tlnp | grep :80

   # 修改 docker-compose.yml 中的端口映射
   ```

2. **数据库连接失败**

   ```bash
   # 检查数据库是否启动
   docker-compose logs database

   # 验证环境变量
   docker-compose exec app env | grep DATABASE_URL
   ```

3. **Nginx 502 错误**

   ```bash
   # 检查 API 服务状态
   docker-compose logs app

   # 检查网络连接
   docker-compose exec nginx ping app
   ```

### 性能优化

1. **调整 Nginx worker 进程数**

   ```nginx
   # 在 nginx.conf 中
   worker_processes auto;
   ```

2. **调整数据库连接池**

   ```bash
   # 在 API 中配置 Prisma 连接池
   DATABASE_URL="postgresql://...?connection_limit=10"
   ```

3. **Redis 内存限制**
   ```yaml
   # 在 docker-compose.yml 中添加
   redis:
     command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
   ```

## 📈 监控和日志

### 日志位置

- Nginx: `./logs/nginx/access.log`
- API: `./logs/api/`
- PostgreSQL: `./logs/postgres/`

### 健康检查

所有服务都配置了健康检查，可以通过以下命令查看：

```bash
docker-compose ps
```

## 🔒 安全建议

1. **生产环境务必**：

   - 修改所有默认密码
   - 使用强 JWT 密钥
   - 配置防火墙规则
   - 定期更新依赖

2. **HTTPS 配置**：

   - 获取 SSL 证书
   - 修改 Nginx 配置支持 HTTPS
   - 强制 HTTP 重定向到 HTTPS

3. **数据备份**：
   - 定期备份 PostgreSQL 数据
   - 配置 Redis 持久化
   - 监控磁盘空间使用

## 📚 参考文档

- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Nginx 配置指南](https://nginx.org/en/docs/)
- [NestJS 部署指南](https://docs.nestjs.com/deployment)
- [Prisma 部署文档](https://www.prisma.io/docs/guides/deployment)
