import service from "@/utils/axios/service";
import { TableData } from "@/types";
import { MonitorData } from "./type";
/**
 * 获取埋点数据
 * @returns
 */
export type MonitorDataResponse = TableData<MonitorData>;
export interface SearchParamsType {
  userName?: string;
}
export const getMonitorData = async (
  page: number,
  limit: number,
  searchParams: SearchParamsType
) => {
  const result = await service.request<MonitorDataResponse>({
    url: `/trackweb`,
    method: "get",
    params: {
      page,
      limit,
      ...searchParams,
    },
  });
  return result.data;
};
