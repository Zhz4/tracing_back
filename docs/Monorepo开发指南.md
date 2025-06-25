## 命令大全

```bash
# 在整个 Monorepo 根目录安装所有依赖（全量安装）

pnpm install

# 给整个 workspace 添加依赖（所有子项目共享）

pnpm add lodash

# 给指定子项目添加依赖（推荐在根目录执行）

pnpm add express --filter web

# 给指定子项目添加开发依赖

pnpm add -D typescript --filter web

# 只安装某个子项目依赖（快速安装）

pnpm install --filter web

# 在子项目目录下添加依赖（不建议）

cd web
pnpm add axios

```
