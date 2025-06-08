import { expect, test } from "vitest";
import treeToPx from "./treeTopx";
test("树形转平面", () => {
  const routes = [
    {
      path: "/",
      children: [
        {
          index: true,
        },
        {
          path: "/home",
          handle: {
            keepAlive: true,
            title: "首页",
          },
        },
        {
          path: "/monitor-data",
          handle: {
            keepAlive: true,
            title: "监控数据",
          },
        },
        {
          path: "/recordscreen",
          handle: {
            keepAlive: true,
            title: "记录屏幕",
          },
        },
      ],
    },
  ];
  const result = [
    {
      path: "/home",
      handle: {
        keepAlive: true,
        title: "首页",
      },
    },
    {
      path: "/monitor-data",
      handle: {
        keepAlive: true,
        title: "监控数据",
      },
    },
    {
      path: "/recordscreen",
      handle: {
        keepAlive: true,
        title: "记录屏幕",
      },
    },
  ];
  const res = treeToPx(routes);
  console.log(res);
  expect(res).toEqual(result);
});
