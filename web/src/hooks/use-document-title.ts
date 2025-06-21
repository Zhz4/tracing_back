import { useEffect } from "react";

/**
 * 用于管理文档标题
 * @param title 页面标题
 * @param suffix 标题后缀，默认为 "前端监控平台"
 */
export function useDocumentTitle(title?: string, suffix = "前端监控平台") {
  useEffect(() => {
    if (title) {
      document.title = `${title} - ${suffix}`;
    } else {
      document.title = suffix;
    }
  }, [title, suffix]);
}
