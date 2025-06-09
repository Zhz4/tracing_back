import { expect, test } from "vitest";
import { findMenus } from "@/utils/route/findMenus";
import { Home, BarChart, List } from "lucide-react";

test("3层嵌套路由", () => {
  const routes = [
    {
      index: true,
    },
    {
      path: "/home",
      handle: {
        icon: Home,
        affix: true,
        keepAlive: true,
        title: "首页",
      },
    },
    {
      path: "/monitor-data",
      handle: {
        icon: BarChart,
        affix: true,
        keepAlive: true,
        title: "监控数据",
      },
      children: [
        {
          path: "/monitor-data/list",
          handle: {
            icon: List,
            affix: true,
            keepAlive: true,
            title: "监控数据列表",
          },
          children: [
            {
              path: "/monitor-data/list/1",
              handle: {
                icon: List,
                affix: true,
                keepAlive: true,
                title: "监控数据列表1",
              },
            },
          ],
        },
      ],
    },
    {
      path: "/recordscreen",
      handle: {
        keepAlive: true,
        title: "记录屏幕",
      },
    },
  ];
  const result = [
    {
      title: "首页",
      url: "/home",
      icon: Home,
    },
    {
      title: "监控数据",
      url: "/monitor-data",
      icon: BarChart,
      children: [
        {
          title: "监控数据列表",
          url: "/monitor-data/list",
          icon: List,
          children: [
            {
              title: "监控数据列表1",
              url: "/monitor-data/list/1",
              icon: List,
            },
          ],
        },
      ],
    },
  ];
  expect(findMenus(routes)).toEqual(result);
});

test("4层嵌套路由", () => {
  const routes = [
    {
      path: "/home",
      handle: {
        icon: Home,
        affix: true,
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
  const result = [
    {
      title: "首页",
      url: "/home",
      icon: Home,
      children: [
        {
          title: "首页列表",
          url: "/home/list",
          icon: List,
          children: [
            {
              title: "首页列表1",
              url: "/home/list/1",
              icon: List,
              children: [
                {
                  title: "首页列表11",
                  url: "/home/list/1/1",
                  icon: List,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  expect(findMenus(routes)).toEqual(result);
});

test("嵌套路由中断处理", () => {
  const routes = [
    {
      path: "/home",
      handle: {
        icon: Home,
        affix: true,
        keepAlive: true,
        title: "首页",
      },
    },
    {
      path: "/monitor-data",
      handle: {
        icon: BarChart,
        affix: true,
        keepAlive: true,
        title: "监控数据",
      },
      children: [
        {
          path: "/monitor-data/list",
          handle: {
            icon: List,
            keepAlive: true,
            title: "监控数据列表",
          },
          children: [
            {
              path: "/monitor-data/list/1",
              handle: {
                icon: List,
                affix: true,
                keepAlive: true,
                title: "监控数据列表1",
              },
            },
          ],
        },
      ],
    },
    {
      path: "/recordscreen",
      handle: {
        keepAlive: true,
        title: "记录屏幕",
      },
    },
  ];
  const result = [
    {
      title: "首页",
      url: "/home",
      icon: Home,
    },
    {
      title: "监控数据",
      url: "/monitor-data",
      icon: BarChart,
    },
  ];
  expect(findMenus(routes)).toEqual(result);
});
