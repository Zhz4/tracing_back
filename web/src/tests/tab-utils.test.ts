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
  
  const res = getKeepAliveInclude(routes);
  
  // 根据实际返回的顺序进行测试
  // [/^\/home\/list\/1\/1(\?.*)?$/, /^\/home\/list\/1(\?.*)?$/, /^\/home\/list(\?.*)?$/, /^\/home(\?.*)?$/]
  
  // 测试 /home/list/1/1 的正则表达式
  expect(res[0].test("/home/list/1/1")).toBe(true);
  expect(res[0].test("/home/list/1/1?sort=desc")).toBe(true);
  expect(res[0].test("/home/list/1")).toBe(false);
  
  // 测试 /home/list/1 的正则表达式
  expect(res[1].test("/home/list/1")).toBe(true);
  expect(res[1].test("/home/list/1?filter=active")).toBe(true);
  expect(res[1].test("/home/list")).toBe(false);
  
  // 测试 /home/list 的正则表达式
  expect(res[2].test("/home/list")).toBe(true);
  expect(res[2].test("/home/list?page=1")).toBe(true);
  expect(res[2].test("/home")).toBe(false);
  
  // 测试 /home 的正则表达式
  expect(res[3].test("/home")).toBe(true);
  expect(res[3].test("/home?id=123")).toBe(true);
  expect(res[3].test("/other")).toBe(false);
});
