# 前端埋点后台服务 - API 接口

一个基于 **NestJS** + **TypeScript** + **Prisma** 的现代化前端埋点数据收集与分析后台服务，提供高效的数据接收、存储和分析能力。

## 📋 项目概述

本项目是前端埋点系统的后端 API 服务，为前端埋点 SDK 和管理界面提供：

- 📊 **埋点数据收集**：高效接收和存储前端埋点数据
- 🔐 **用户认证系统**：安全的用户身份验证和授权
- 📈 **数据分析服务**：多维度数据统计和分析
- 📚 **API 文档**：完整的 Swagger 接口文档
- 🗄️ **数据库管理**：基于 Prisma 的数据库操作

## 🛠 技术栈

### 核心框架

- **NestJS** `v11.0.1` - 企业级 Node.js 框架
- **TypeScript** `v5.7.3` - 静态类型检查
- **Node.js** `>= 18.0.0` - 运行时环境

### 数据库与 ORM

- **Prisma** `v6.8.2` - 现代化数据库 ORM
- **PostgreSQL** - 主数据库（支持其他数据库）
- **Prisma Client** - 类型安全的数据库访问

### 数据验证与转换

- **class-validator** `v0.14.2` - 数据验证
- **class-transformer** `v0.5.1` - 数据转换
- **Mapped Types** - DTO 类型映射

### API 文档

- **Swagger** `v11.2.0` - API 文档生成
- **Swagger UI Express** - 交互式 API 文档界面

### 开发工具

- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化
- **Jest** - 单元测试框架

## 🚀 快速开始

### 环境要求

```bash
Node.js >= 18.0.0
pnpm >= 8.0.0 (推荐) 或 npm >= 9.0.0
PostgreSQL >= 12.0 (或其他兼容数据库)
```

### 环境变量配置

创建 `.env` 文件：

```bash
# 数据库连接
DATABASE_URL="postgresql://username:password@localhost:5432/trackweb_db"
DIRECT_URL="postgresql://username:password@localhost:5432/trackweb_db"

# 服务端口
PORT=3000

# JWT 密钥（可选，如果使用JWT认证）
JWT_SECRET="your-secret-key"
```

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 数据库设置

```bash
# 生成 Prisma 客户端
pnpm prisma:generate

# 运行数据库迁移
pnpm prisma:migrate

# 打开数据库管理界面（可选）
pnpm prisma:studio
```

### 启动服务

```bash
# 开发环境
pnpm start:dev

# 生产环境
pnpm build
pnpm start:prod

# 调试模式
pnpm start:debug
```

## 🎯 核心功能模块

### 1. 埋点数据收集 (`/trackweb`)

**主要功能：**

- 📊 接收前端埋点数据
- 🗄️ 数据持久化存储
- 🔍 数据查询和筛选
- 📋 支持多种事件类型

**支持的数据类型：**

- 用户行为事件（点击、浏览等）
- 性能监控数据
- 错误信息收集
- 自定义事件数据

### 2. 用户认证系统 (`/auth`)

**主要功能：**

- 🔐 用户注册和登录
- 🔑 JWT 令牌管理
- 👤 用户信息管理
- 🛡️ 权限验证

### 3. 数据分析服务 (`/analyze`)

**主要功能：**

- 📈 数据统计分析
- 📊 多维度报表生成
- 🔍 数据查询接口
- 📋 自定义分析指标

### 4. 公共服务 (`/common`)

**主要功能：**

- 🛡️ 全局异常处理
- 🔄 数据转换拦截器
- ✅ 请求验证管道
- 📝 日志记录

## 🗄️ 数据库模型

### 核心数据表

1. **TrackingData** - 埋点数据主表

   - 设备信息（屏幕尺寸、浏览器等）
   - 用户信息（用户ID、会话ID等）
   - 应用信息（应用名称、页面ID等）

2. **EventInfo** - 事件信息表

   - 事件基础信息（类型、时间等）
   - 用户交互数据（点击位置、元素路径等）
   - 性能数据（加载时间、响应时间等）
   - 错误信息（错误堆栈、录屏数据等）

3. **User** - 用户信息表
   - 用户基础信息
   - 认证相关数据

## 🔧 开发指南

### 常用命令

```bash
# 开发
pnpm start:dev            # 启动开发服务器
pnpm start:debug          # 启动调试模式
pnpm build                # 构建生产版本
pnpm start:prod           # 启动生产服务器

# 数据库
pnpm prisma:generate      # 生成 Prisma 客户端
pnpm prisma:migrate       # 运行数据库迁移
pnpm prisma:studio        # 打开数据库管理界面
pnpm prisma:format        # 格式化 Prisma 文件

# 代码质量
pnpm lint                 # ESLint 代码检查
pnpm format               # Prettier 代码格式化

# 测试
pnpm test                 # 运行单元测试
pnpm test:e2e             # 运行端到端测试
pnpm test:cov             # 生成测试覆盖率报告
```

### API 设计规范

1. **RESTful API 设计**

   - 使用标准 HTTP 方法（GET、POST、PUT、DELETE）
   - 清晰的资源路径命名
   - 统一的响应格式

2. **数据验证**

   - 使用 DTO 定义数据结构
   - class-validator 进行数据验证
   - 自动类型转换和过滤

3. **错误处理**
   - 全局异常过滤器
   - 统一错误响应格式
   - 详细的错误日志记录

### 开发最佳实践

1. **模块化设计**

   - 按功能划分模块
   - 清晰的依赖关系
   - 可复用的服务组件

2. **类型安全**

   - 完整的 TypeScript 类型定义
   - Prisma 提供的类型安全数据库操作
   - DTO 类型验证

3. **性能优化**

   - 数据库查询优化
   - 请求体大小限制（支持 50MB 大文件）
   - 异步处理和批量操作

4. **安全性**
   - 输入数据验证和过滤
   - CORS 跨域配置
   - 请求大小限制

## 📊 API 接口文档

启动服务后访问 [http://localhost:3000/docs](http://localhost:3000/docs) 查看完整的 Swagger API 文档。

### 主要接口端点

```
POST   /trackweb          # 接收埋点数据
GET    /trackweb          # 查询埋点数据
POST   /auth/login        # 用户登录
POST   /auth/register     # 用户注册
GET    /analyze/stats     # 获取统计数据
```

## 🌟 特性亮点

- ⚡ **高性能**：支持大容量埋点数据处理（50MB 请求体）
- 🔒 **类型安全**：完整的 TypeScript 和 Prisma 类型定义
- 📚 **文档完善**：自动生成的 Swagger API 文档
- 🛡️ **安全可靠**：全面的数据验证和异常处理
- 🔄 **易于扩展**：模块化架构，支持快速功能扩展
- 🗄️ **数据库优化**：索引优化，支持高并发查询
- 🌐 **跨域支持**：完整的 CORS 配置

## 🔍 监控与日志

- 全局请求响应拦截器
- 详细的错误日志记录
- 数据库操作日志
- 性能监控指标
