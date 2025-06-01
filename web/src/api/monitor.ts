import service from "@/utils/axios/service";
import { MonitorData } from "@/pages/monitorData/components/columns";

/**
 * 获取埋点数据
 * @returns
 */
export interface MonitorDataResponse {
  records: MonitorData[];
  pagination: {
    hasNext: boolean;
    hasPrev: boolean;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
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
