import { expect, test } from "vitest";
import { getKeepAliveInclude } from "../layouts/tabs/tab-utils";
import { Home, List } from "lucide-react";

test("获取keepAlive的路由", () => {
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
          path: "/home/list",
          handle: {
            affix: true,
            keepAlive: true,
            title: "首页列表",
            icon: List,
          },
          children: [
            {
              path: "/home/list/1",
              handle: {
                affix: true,
                keepAlive: true,
                title: "首页列表1",
                icon: List,
              },
              children: [
                {
                  path: "/home/list/1/1",
                  handle: {
                    affix: true,
                    keepAlive: true,
                    title: "首页列表11",
                    icon: List,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const result = ["/home", "/home/list", "/home/list/1", "/home/list/1/1"];
  const res = getKeepAliveInclude(routes);
  expect(res).toEqual(expect.arrayContaining(result));
});
