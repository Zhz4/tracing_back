import { treeToPx } from "@/utils/route/treeTopx";
import type { RouteObject } from "react-router-dom";

export const getKeepAliveInclude = (routes: RouteObject[]) => {
  const routesPx = treeToPx(routes);
  return routesPx
    .filter((route) => route.handle?.keepAlive)
    .map((item) => item.path);
};
