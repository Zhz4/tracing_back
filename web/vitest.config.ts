/// <reference types="vitest" />

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  test: {
    globals: true, // 允许使用 describe/test 等全局函数
    // environment: "jsdom", // 如果你在测试 DOM 相关功能（比如 React/Vue），需要 jsdom
    coverage: {
      reporter: ["text", "json", "html"], // 覆盖率报告类型
      exclude: ["node_modules/"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
