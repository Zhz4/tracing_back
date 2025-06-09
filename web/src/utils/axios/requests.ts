import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";

export interface RequestOptions extends RequestInit {
  timeout?: number;
}

export interface ResponseType<T> {
  code: number;
  data: T;
  message: string;
}

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 200 && response.request.responseType !== "blob") {
      toast.error(res.message || "请求失败");
      return Promise.reject(res);
    }

    return res;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        toast.error("请求超时");
        return Promise.reject(new Error("请求超时"));
      }
      if (error.status === 401) {
        toast.error("未登录或登录过期");
        localStorage.removeItem("access_token");

        const currentPath = window.location.pathname;
        window.location.href = `/login?redirect=${encodeURIComponent(
          currentPath
        )}`;

        return Promise.reject(new Error("未登录或登录过期"));
      }
      toast.error(error.response?.data?.message || "请求失败");
      return Promise.reject(error.response?.data || "请求失败");
    }
    toast.error("请求失败");
    return Promise.reject(new Error("请求失败"));
  }
);

export default instance;
