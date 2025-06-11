import service from "@/utils/axios/service";
import { PageData, PageErrorData } from "./type";
/**
 * 获取页面统计数据
 * @returns
 */
export const getPageData = async () => {
  const result = await service.request<PageData[]>({
    url: `/analyze/page`,
    method: "get",
  });
  return result.data;
};

/**
 * 获取页面错误统计数据
 * @returns
 */
export const getPageErrorData = async () => {
  const result = await service.request<PageErrorData[]>({
    url: `/analyze/error`,
    method: "get",
  });
  return result.data;
};
