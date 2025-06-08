import type { RouteObject } from "react-router-dom";
/**
 * 树形转为平面结构 -- 针对路由
 */
const treeToPx = (tree: RouteObject[]) => {
  const px_result: RouteObject[] = [];
  tree.forEach((item) => {
    if (item.children && item.children.length > 0) {
      const childPx = treeToPx(item.children as RouteObject[]);
      px_result.push(...childPx);
    } else {
      if (item.index) return;
      px_result.push(item);
    }
  });
  return px_result;
};

export default treeToPx;
