# 前端埋点监控系统

一个基于 **NestJS** 和 **React** 的现代化前端埋点数据收集与分析系统，提供完整的监控解决方案。

## 🚀 快速开始

### 系统架构

```
前端应用 -> 集成SDK -> 数据上报 -> 后端API -> 数据存储 -> Web管理后台
```

## 📦 使用指南

### 1. SDK 集成（前端应用）

#### 1.1 安装 SDK

```bash
# 核心SDK包
npm install @smooth_zhz/web-tracing-core

# 针对不同框架的适配包
npm install @smooth_zhz/web-tracing-vue2  # Vue2项目
npm install @smooth_zhz/web-tracing-vue3  # Vue3项目
```

#### 1.2 原生 JavaScript 项目

```javascript
import { initTracking } from '@smooth_zhz/web-tracing-core'

// 初始化埋点SDK
initTracking({
  // 上报地址（后端API地址）
  dsn: 'http://localhost:3000/trackweb',
  
  // 项目配置
  appName: '我的应用',
  // 监控配置
  pv: true,           // 页面访问统计
  performance: true,  // 性能监控
  error: true,        // 错误监控
  event: true,        // 事件监控
  resource: true,     // 资源监控
  http: true,         // HTTP请求监控
  
  // 录屏配置（可选）
  recordScreen: true,
  beforeSendData: (data) => {
    // 可以在这里对数据进行处理
    console.log('上报数据:', data)
    return data
  }
})
```

#### 1.3 Vue2 项目

```javascript
// main.js
import Vue from 'vue'
import WebTracing from '@smooth_zhz/web-tracing-vue2'

Vue.use(WebTracing, {
  dsn: 'http://localhost:3000/trackweb',
  appName: 'Vue2应用',
  pv: true,
  performance: true,
  error: true,
  event: true,
  resource: true,
  http: true
  // 录屏配置（可选）
  recordScreen: true,
})
```

#### 1.4 Vue3 项目

```javascript
// main.js
import { createApp } from 'vue'
import WebTracing from '@smooth_zhz/web-tracing-vue3'
import App from './App.vue'

const app = createApp(App)

app.use(WebTracing, {
  dsn: '服务器地址/trackweb',
  appName: 'Vue3应用',
  pv: true,
  performance: true,
  error: true,
  event: true,
  resource: true,
  http: true
})

app.mount('#app')
```

#### 1.5 自定义埋点-手动上报（举例）

```javascript
//  主动触发错误信
import { traceError } from '@smooth_zhz/web-tracing-core'
traceError({
  message: 'xxx',
  params: {
    name: 'aa'
  }
})

// 主动触发性能信息
import { tracePerformance } from '@smooth_zhz/web-tracing-core'
tracePerformance({
  message: 'xxx',
  params: {
    name: 'aa'
  }
})

```

#### 1.6 HTML 数据属性

为元素添加数据属性以便自动收集：

```html
<!-- 自动收集点击事件 -->
<div data-warden-container data-warden-event-id="点击课程">
    点击课程
</div>
```

### 2. 项目部署

#### 2.1 Docker 一键部署（推荐）

```bash
# 1. 克隆项目
git clone [项目地址]
cd tracing_back

# 2. 创建环境变量文件
cp .env.example .env

# 编辑 .env 文件
DATABASE_URL=postgresql://postgres:password@database:5432/tracing_db
POSTGRES_DB=tracing_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# 3. 启动所有服务
docker-compose up -d

# 4. 查看服务状态
docker-compose ps
```

部署完成后：
- **管理后台**: http://localhost
- **API接口**: http://localhost/api
- **API文档**: http://localhost/docs

### 4. 功能特性

#### 4.1 SDK 监控能力

- ✅ **PV统计**: 页面访问量、用户访问路径
- ✅ **性能监控**: 首屏加载时间、资源加载耗时
- ✅ **错误监控**: JavaScript错误、Promise错误、资源加载错误
- ✅ **事件监控**: 用户点击、表单提交等交互行为
- ✅ **HTTP监控**: 接口请求成功率、响应时间
- ✅ **资源监控**: 图片、CSS、JS等资源加载情况
- ✅ **录屏功能**: 错误场景自动录屏回放
- ✅ **用户行为**: 用户操作轨迹追踪

#### 4.2 后台管理功能

- 📊 **实时监控**: 实时查看应用健康状态 ✅ 
- 📈 **数据分析**: 多维度数据分析和可视化 ✅ 
- 🔍 **日志查询**: 支持条件筛选和搜索 ❌
- 📱 **告警通知**: 异常情况及时通知 ❌
- 👥 **用户管理**: 多用户权限管理 ❌
- ⚙️ **系统配置**: 灵活的监控规则配置 ❌

## 🛠 技术栈

- **后端**: NestJS + Prisma + PostgreSQL + Swagger
- **前端**: React + Vite + Tailwind CSS + Radix UI
- **SDK**: TypeScript + Rollup + Monorepo
- **部署**: Docker + Nginx + Docker Compose


## 📚 相关文档

- [SDK完整文档](https://m-cheng-web.github.io/web-tracing/)
- [API接口文档](http://localhost:80/docs)
- [部署指南](./docs/deployment.md)
- [示例项目](./sdk/examples/)