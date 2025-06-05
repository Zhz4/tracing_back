import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import Layout from "@/layouts";
import MonitorData from "@/pages/monitorData";
import RecordscreenPage from "@/pages/recordscreen";

export const routes = [
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
          keepAlive: true,
          title: "首页",
        },
      },
      {
        path: "/monitor-data",
        element: <MonitorData />,
        handle: {
          keepAlive: true,
          title: "监控数据",
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
