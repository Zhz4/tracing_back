export interface PageData {
  url: string;
  views: number;
}

export interface PageErrorData {
  appName: string;
  errorCount: number;
}

export interface HourlyActivityResponse {
  hour: string;
  pageViews: number;
  events: number;
}
