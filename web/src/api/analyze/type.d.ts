export interface PageData {
  // 页面URL
  url: string;
  // 页面浏览量
  views: number;
}

export interface PageErrorData {
  // 应用名称
  appName: string;
  // 错误数量
  errorCount: number;
}

export interface HourlyActivityResponse {
  // 小时时间，格式为 HH:mm
  hour: string;
  // 页面浏览量
  pageViews: number;
  // 总事件数量
  events: number;
}

export interface WeeklyActivityTrendResponse {
  // 页面浏览增长率（百分比）
  pageViewGrowth: number;
  // 事件交互增长率（百分比）
  eventGrowth: number;
  // 最活跃时段
  mostActiveHour: string;
  // 平均在线时长（分钟）
  averageOnlineTime: number;
  // 活跃天数
  activeDays: number;
  // 7天内每日活跃度详情
  dailyDetails: Array<{
    // 日期
    date: string;
    // 页面浏览量
    pageViews: number;
    // 事件数量
    events: number;
    // 在线时长（分钟）
    onlineTime: number;
  }>;
}
