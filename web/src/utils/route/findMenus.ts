import { RouteObject } from "react-router-dom";
interface Menu {
  title: string;
  url: string;
  icon: React.ElementType;
  children?: Menu[];
}
export const findMenus = (routes: RouteObject[]): Menu[] => {
  const menus: Menu[] = [];
  routes.forEach((route) => {
    if (route.handle && route.handle.affix) {
      const menu: Menu = {
        title: route.handle.title,
        url: route.path!,
        icon: route.handle.icon,
      };
      if (route.children) {
        const childMenus = findMenus(route.children);
        if (childMenus.length > 0) {
          menu.children = childMenus;
        }
      }
      menus.push(menu);
    }
  });
  return menus;
};
