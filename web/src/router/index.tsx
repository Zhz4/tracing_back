import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import Layout from "@/layouts";
import MonitorData from "@/pages/monitorData";
import RecordscreenPage from "@/pages/recordscreen";
import type { RouteObject } from "react-router-dom";
import { BarChart, House } from "lucide-react";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
        handle: {
          icon: House,
          affix: true,
          keepAlive: true,
          title: "首页",
        },
      },
      {
        path: "/monitor-data",
        element: <MonitorData />,
        handle: {
          icon: BarChart,
          affix: true,
          keepAlive: true,
          title: "实时数据",
        },
      },
      {
        path: "/recordscreen",
        element: <RecordscreenPage />,
        handle: {
          keepAlive: true,
          title: "记录屏幕",
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
