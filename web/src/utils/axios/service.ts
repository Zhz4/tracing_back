import { AxiosRequestConfig } from "axios";
import instance, { ResponseType } from "./requests";

export interface ServiceRequestConfig
  extends Omit<AxiosRequestConfig, "url" | "method" | "data" | "params"> {
  url: string;
  method?: "get" | "post" | "put" | "delete";
  data?: unknown;
  params?: Record<string, unknown>;
}

interface Service {
  request<T>(config: ServiceRequestConfig): Promise<ResponseType<T>>;
}

// 创建service实例
const service: Service = {
  request<T>(config: ServiceRequestConfig) {
    const { url, method = "get", data, params, ...rest } = config;

    return instance.request<ResponseType<T>, ResponseType<T>>({
      url,
      method,
      params,
      data,
      ...rest,
    });
  },
};

export default service;
