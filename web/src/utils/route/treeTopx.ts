import type { RouteObject } from "react-router-dom";
import _ from "lodash";

export const treeToPx = (tree: RouteObject[]) => {
  const treeClone = _.cloneDeep(tree);
  const px_result: RouteObject[] = [];
  treeClone.forEach((item) => {
    if (item.children && item.children.length > 0) {
      const childPx = treeToPx(item.children as RouteObject[]);
      px_result.push(...childPx);
    }
    if (item.children) {
      delete item.children;
    }
    if (item.index) return;
    px_result.push(item);
  });
  return px_result;
};

export const matchedRoute = (tree: RouteObject[], path: string) => {
  const routesPx = treeToPx(tree);
  const cleanPath = path.split("?")[0];
  // 尝试找到匹配的路由
  const matchedRoute = routesPx.find(route => {
    if (!route.path) return false;
    
    // 简单的匹配：如果路径包含参数，用正则匹配
    if (route.path.includes(':')) {
      const pathPattern = route.path.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(cleanPath);
    }
    
    // 精确匹配
    return route.path === cleanPath;
  });
  
  return matchedRoute;
};
