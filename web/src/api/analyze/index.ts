import service from "@/utils/axios/service";
import { PageData, PageErrorData } from "./type";
import {
  HourlyActivityResponse,
  WeeklyActivityTrendResponse,
  PageVisitStatsWrapperResponse,
} from "@/api/analyze/type";
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

// 用户24小时活跃度分析
export const getUser24HourActive = async (
  userUuid: string,
  timestamp?: number
) => {
  const result = await service.request<HourlyActivityResponse[]>({
    url: `/analyze/active/${userUuid}/day`,
    method: "get",
    params: { timestamp },
  });
  return result.data;
};

// 近7天用户活跃度变化趋势
export const getUserWeeklyActivityTrend = async (userUuid: string) => {
  const result = await service.request<WeeklyActivityTrendResponse>({
    url: `/analyze/active/${userUuid}/weekly-trend`,
    method: "get",
  });
  return result.data;
};

// 页面访问统计
export const getPageVisitStats = async (userUuid: string) => {
  const result = await service.request<PageVisitStatsWrapperResponse>({
    url: `/analyze/page-visit-stats/${userUuid}`,
    method: "get",
  });
  return result.data;
};
