import service from "@/utils/axios/service";
import { TableData } from "@/types";
import { MonitorData } from "./type";

/**
 * 获取埋点数据
 * @returns
 */
export type MonitorDataResponse = TableData<MonitorData>;
export const getMonitorData = async (page: number, limit: number) => {
  const result = await service.request<MonitorDataResponse>({
    url: `/trackweb`,
    method: "get",
    params: {
      page,
      limit,
    },
  });
  return result.data;
};
