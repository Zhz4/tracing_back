# 前端埋点后台服务

一个基于 **NestJS** 和 **React** 的现代化前端埋点数据收集与分析系统。

## 📋 项目介绍

本项目提供了完整的前端埋点解决方案，包括：

- 📊 **数据收集服务**：高效收集前端用户行为数据
- 📈 **数据分析后台**：可视化数据分析和报表
- 🔒 **用户认证系统**：安全的用户身份验证
- 🎨 **现代化 UI 界面**：基于 Tailwind CSS 的响应式设计

## 🛠 技术栈

### 后端服务 (api/)

- **框架**: NestJS v11.0.1
- **数据库**: Prisma ORM
- **文档**: Swagger API 文档
- **语言**: TypeScript
- **验证**: class-validator + class-transformer

### 前端界面 (web/)

- **框架**: React v19.1.0
- **构建工具**: Vite v6.3.5
- **样式**: Tailwind CSS v4.1.8
- **UI 组件**: Radix UI + Lucide React
- **语言**: TypeScript

## 🚀 核心功能

### 埋点数据收集

- ✅ 用户行为跟踪
- ✅ 页面访问统计
- ✅ 事件数据记录
- ✅ 自定义数据收集

### 数据分析

- 📊 实时数据监控
- 📈 用户行为分析
- 📋 自定义报表生成
- 🔍 数据筛选与搜索

### 系统管理

- 👤 用户认证与授权
- ⚙️ 系统配置管理
- 📱 响应式界面设计

## 📦 安装与运行

### 环境要求

- Node.js >= 18.0.0
- pnpm (推荐) 或 npm

### 1. 克隆项目

```bash
git clone [项目地址]
cd tracing_back
```

### 2. 安装依赖

**后端服务**:

```bash
cd api
pnpm install
```

**前端界面**:

```bash
cd web
pnpm install
```

### 3. 数据库配置

```bash
cd api
# 生成 Prisma 客户端
pnpm prisma:generate

# 运行数据库迁移
pnpm prisma:migrate init

# 打开数据库管理界面（可选）
pnpm prisma:studio
```

### 4. 启动服务

**开发模式**:

启动后端服务：

```bash
cd api
pnpm start:dev
```

启动前端服务：

```bash
cd web
pnpm dev
```

**生产模式**:

```bash
# 构建前端
cd web
pnpm build

# 构建并启动后端
cd api
pnpm build
pnpm start:prod
```

## 📚 API 文档

项目集成了 Swagger API 文档，启动后端服务后可访问：

```
http://localhost:3000/api
```

## 📁 项目结构

```
tracing_back/
├── api/                     # 后端服务
│   ├── src/
│   │   ├── auth/           # 认证模块
│   │   ├── trackweb/       # 埋点核心模块
│   │   ├── common/         # 公共模块
│   │   └── main.ts         # 应用入口
│   ├── prisma/             # 数据库模型
│   └── package.json
├── web/                     # 前端界面
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── pages/          # 页面组件
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── layouts/        # 布局组件
│   │   └── lib/            # 工具库
│   └── package.json
└── README.md
```

## 🔧 开发指南

### 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 TypeScript 严格模式

### 常用命令

**后端开发**:

```bash
pnpm start:dev          # 开发模式启动
pnpm build              # 构建项目
pnpm test               # 运行测试
pnpm lint               # 代码检查
```

**前端开发**:

```bash
pnpm dev                # 开发模式启动
pnpm build              # 构建项目
pnpm preview            # 预览构建结果
pnpm lint               # 代码检查
```

## 🌟 特性优势

- 🚀 **高性能**: 基于现代框架构建，性能优异
- 🔒 **安全性**: 完善的认证授权机制
- 📱 **响应式**: 支持多设备适配
- 🎨 **现代化**: 简洁美观的用户界面
- 🔧 **可扩展**: 模块化架构，易于扩展
- 📖 **文档完善**: 详细的 API 文档
