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
