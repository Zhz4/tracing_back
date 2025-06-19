import { expect, test } from "vitest";
import { getKeepAliveInclude } from "../layouts/tabs/tab-utils";
import { Home, List } from "lucide-react";

test("获取keepAlive的路由2", () => {
  const routes = [
    {
      path: "/home",
      handle: {
        icon: Home,
        keepAlive: true,
        title: "首页",
      },
      children: [
        {
          path: "/userBehavior/:userId",
          handle: {
            keepAlive: true,
            title: "首页列表",
            icon: List,
          },
        },
      ],
    },
  ];
  
  const res = getKeepAliveInclude(routes);
  console.log(res);
  expect(res[0].test("/userBehavior/1")).toBe(true);
  expect(res[1].test("/home")).toBe(true);
});