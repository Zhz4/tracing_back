import service from "@/utils/axios/service";
import { PageData } from "./type";
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
