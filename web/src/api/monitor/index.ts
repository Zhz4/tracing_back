import service from "@/utils/axios/service";
import { TableData } from "@/types";
import { EventInfo, MonitorData, RecordscreenData } from "./type";
/**
 * 获取埋点数据
 * @returns
 */
export type MonitorDataResponse = TableData<MonitorData>;
export interface SearchParamsType {
  userName?: string;
  eventTypeList?: string[];
}
export const getMonitorData = async (
  page: number,
  limit: number,
  searchParams: SearchParamsType
) => {
  const result = await service.request<MonitorDataResponse>({
    url: `/trackweb/page`,
    method: "post",
    data: {
      page,
      limit,
      ...searchParams,
    },
  });
  return result.data;
};

/**
 * 根据埋点Id 获取事件
 */
export const getEventById = async (id: string) => {
  const result = await service.request<EventInfo[]>({
    url: `/trackweb/event/${id}`,
    method: "get",
  });
  return result.data;
};

/**
 * 根据事件Id查询录屏数据
 */
export const getRecordscreenDataByEventId = async (id: string) => {
  const result = await service.request<RecordscreenData>({
    url: `/trackweb/event/${id}/screen`,
    method: "get",
  });
  return result.data;
};
