import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import Layout from "@/layouts";
import Login from "@/pages/login";
import MonitorData from "@/pages/monitorData";
import RecordscreenPage from "@/pages/recordscreen";
import UserBehaviorAnalysis from "@/pages/userBehavior";
import NotFoundPage from "@/pages/404";
import type { RouteObject } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute";
import { BarChart, House, User } from "lucide-react";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
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
          title: "记录屏幕",
        },
      },
      {
        path: "/user-behavior/:userUuid",
        element: <UserBehaviorAnalysis />,
        handle: {
          icon: User,
          keepAlive: true,
          title: "用户行为分析",
        },
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    handle: {
      title: "登录",
    },
  },
  {
    path: "*",
    element: <NotFoundPage />,
    handle: {
      title: "页面未找到",
    },
  },
];

export const router = createBrowserRouter(routes);
