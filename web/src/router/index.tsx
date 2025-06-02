import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/home";
import Layout from "@/layouts";
import MonitorData from "@/pages/monitorData";
import RecordscreenPage from "@/pages/recordscreen";

export const routes = createBrowserRouter([
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
      },
      {
        path: "/monitor-data",
        element: <MonitorData />,
      },
      {
        path: "/recordscreen",
        element: <RecordscreenPage />,
      },
    ],
  },
]);
