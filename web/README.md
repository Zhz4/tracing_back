# 前端埋点数据分析系统 - Web 前端

一个基于 **React** + **TypeScript** + **Vite** 的现代化前端埋点数据分析平台，提供直观的数据可视化和用户行为分析界面。

## 📋 项目概述

本项目是前端埋点后台服务的 Web 用户界面，为用户提供：

- 📊 **数据监控面板**：实时展示埋点数据统计
- 🎥 **录屏回放**：用户行为轨迹回放功能
- ⚙️ **系统设置**：用户偏好和系统配置
- 🏠 **首页导航**：快速访问各个功能模块

## 🛠 技术栈

### 核心框架

- **React** `v19.1.0` - 前端 UI 框架
- **TypeScript** `v5.8.3` - 静态类型检查
- **Vite** `v6.3.5` - 现代化构建工具

### UI 与样式

- **Tailwind CSS** `v4.1.8` - 原子化 CSS 框架
- **Radix UI** - 无障碍、可定制的 UI 组件
- **Lucide React** - 现代化图标库
- **Framer Motion** - 流畅的动画效果

### 路由与导航

- **React Router DOM** `v7.6.1` - 客户端路由
- **Keepalive for React Router** - 页面缓存优化

### 开发工具

- **ESLint** - 代码质量检查
- **Vitest** - 单元测试框架
- **Code Inspector Plugin** - 组件定位工具

## 📁 项目目录结构

```
web/
├── public/                    # 静态资源目录
│   └── vite.svg              # 默认图标
├── src/                       # 源代码目录
│   ├── api/                   # API 接口管理
│   ├── assets/                # 静态资源（图片、字体等）
│   ├── components/            # 通用组件
│   │   ├── ui/                # UI 基础组件（基于 Radix UI）
│   │   ├── table/             # 表格组件
│   │   ├── app-sidebar.tsx    # 侧边栏组件
│   │   ├── mode-toggle.tsx    # 主题切换组件
│   │   └── theme-provider.tsx # 主题提供者组件
│   ├── constants/             # 常量定义
│   ├── hooks/                 # 自定义 React Hooks
│   ├── layouts/               # 布局组件
│   ├── lib/                   # 工具库和配置
│   ├── pages/                 # 页面组件
│   │   ├── home/              # 首页
│   │   ├── monitorData/       # 数据监控页面
│   │   ├── recordscreen/      # 录屏回放页面
│   │   └── settings/          # 系统设置页面
│   ├── router/                # 路由配置
│   ├── types/                 # TypeScript 类型定义
│   ├── utils/                 # 工具函数
│   ├── App.tsx                # 应用根组件
│   ├── main.tsx               # 应用入口文件
│   ├── index.css              # 全局样式
│   └── vite-env.d.ts          # Vite 环境类型定义
├── components.json            # Radix UI 组件配置
├── eslint.config.js           # ESLint 配置
├── index.html                 # HTML 模板
├── package.json               # 项目依赖和脚本
├── pnpm-lock.yaml             # pnpm 锁定文件
├── postcss.config.js          # PostCSS 配置
├── tsconfig.json              # TypeScript 配置
├── tsconfig.app.json          # 应用 TypeScript 配置
├── tsconfig.node.json         # Node.js TypeScript 配置
├── vite.config.ts             # Vite 构建配置
├── vitest.config.ts           # Vitest 测试配置
└── README.md                  # 项目文档
```

### 目录说明

- **`src/pages/`** - 存放各个页面组件，每个页面一个文件夹
- **`src/components/`** - 通用组件库，包含 UI 组件和业务组件
- **`src/api/`** - API 接口定义和请求封装
- **`src/hooks/`** - 自定义 React Hooks，封装可复用逻辑
- **`src/utils/`** - 通用工具函数和辅助方法
- **`src/types/`** - TypeScript 类型定义，确保类型安全
- **`src/router/`** - 路由配置和导航管理
- **`src/lib/`** - 第三方库配置和自定义工具库

## 🚀 快速开始

### 环境要求

```bash
Node.js >= 18.0.0
pnpm >= 8.0.0 (推荐) 或 npm >= 9.0.0
```

### 安装依赖

```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

### 开发环境启动

```bash
# 启动开发服务器
pnpm dev

# 应用将在 http://localhost:5173 启动
```

### 构建生产版本

```bash
# 构建生产环境代码
pnpm build

# 预览构建结果
pnpm preview
```

## 🎯 核心功能

### 1. 数据监控面板 (`/monitor-data`)

- 📈 实时数据统计图表
- 📋 数据表格展示
- 🔍 数据筛选和搜索
- 📊 多维度数据分析

### 2. 录屏回放 (`/record-screen`)

- 🎥 用户操作录屏回放
- ⏯️ 播放控制（播放/暂停/快进）
- 📹 高质量录屏数据展示
- 🔄 多录屏文件管理

### 3. 系统设置 (`/settings`)

- ⚙️ 用户偏好设置
- 🎨 主题切换（暗色/亮色模式）
- 📊 数据展示配置
- 🔔 通知设置

### 4. 首页导航 (`/`)

- 🏠 功能模块快速入口
- 📊 数据概览面板
- 🔗 常用功能快捷访问

## 🔧 开发指南

### 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm preview          # 预览构建结果

# 代码质量
pnpm lint             # ESLint 代码检查
pnpm test             # 运行测试

# 依赖管理
pnpm install          # 安装依赖
pnpm update           # 更新依赖
```

### 代码规范

- ✅ 使用 **TypeScript** 进行类型安全编程
- ✅ 遵循 **ESLint** 代码规范
- ✅ 组件使用 **函数式组件** + **Hooks**
- ✅ 使用 **React Query** 管理服务端状态
- ✅ 采用 **Tailwind CSS** 原子化样式

### 开发最佳实践

1. **组件设计**

   - 保持组件职责单一
   - 使用 TypeScript 定义清晰的 Props 接口
   - 合理拆分业务组件和 UI 组件

2. **状态管理**

   - 本地状态使用 `useState` 和 `useReducer`
   - 服务端状态使用 `@tanstack/react-query`
   - 表单状态使用 `react-hook-form`

3. **样式开发**

   - 优先使用 Tailwind CSS 原子类
   - 复杂样式使用 CSS Modules 或 styled-components
   - 支持暗色主题切换

4. **性能优化**
   - 使用 React.memo 优化组件渲染
   - 路由级别的代码分割
   - 图片和资源懒加载

## 🌟 特性亮点

- ⚡ **快速开发**：Vite 提供毫秒级热更新
- 🎨 **现代设计**：基于 Radix UI 的精美组件
- 📱 **响应式设计**：完美适配移动端和桌面端
- 🌓 **主题切换**：支持亮色/暗色主题
- 🔒 **类型安全**：完整的 TypeScript 类型定义
- 🚀 **高性能**：优化的构建产物和运行时性能
- 🧪 **测试友好**：集成 Vitest 测试框架

## 📚 相关文档

- [React 官方文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [TanStack Query 文档](https://tanstack.com/query)
- [shadcn ui 文档](https://ui.shadcn.com/docs/components)
