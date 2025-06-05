import { EventTypeEnum } from "@/constants";

export interface PaginationType {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TableData<T> {
  records: T[];
  pagination: PaginationType;
}

export interface EventBase {
  // 事件ID
  eventId: string;
  // 事件类型
  eventType: EventTypeEnum;
  // 事件发生时间
  triggerTime: number;
  // 发送时间
  sendTime: number;
  // 当前页面URL
  triggerPageUrl: string;
}

// 事件采集
export interface EventClick extends EventBase {
  // 事件名
  title: string;
  // 事件参数
  params: Record<string, unknown>;
  // 被点击元素的层级 例如: div>div>button
  elementPath: string;
  // 被点击元素与屏幕左边距离
  x: number;
  // 被点击元素与屏幕上边距离
  y: number;
}

// 错误事件
export interface EventError extends EventBase {
  // 错误信息
  errMessage: string;
  // 错误的完整信息
  errStack: string;
  // 错误发生行号
  line: number;
  // 错误发生列号
  col: number;
  // 错误录屏信息
  recordscreen: string;
  // 主动触发错误可以携带参数
  params: Record<string, unknown>;
}

// 路由事件
export enum EventRouteAction {
  // 网页通过点击链接,地址栏输入,表单提交,脚本操作等方式加载
  navigate = "navigate",
  // 网页通过“重新加载”按钮或者location.reload()方法加载
  reload = "reload",
  // 网页通过“前进”或“后退”按钮加载
  back_forward = "back_forward",
  // 任何其他来源的加载
  reserved = "reserved",
}
export interface EventRoute extends EventBase {
  // 上级页面URL
  referer: string;
  // 当前页面标题 document.title
  title: string;
  // 页面加载来源
  action: EventRouteAction;
  // 停留时间
  durationTime?: number;
}

// 请求事件
export interface EventRequest extends EventBase {
  // 请求URL
  requestUrl: string;
  // 请求方法
  requestMethod:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD";
  // 请求类型
  requestType: "xhr" | "fetch" | "websocket" | "other";
  // 请求返回状态码
  responseStatus: number;
  // 请求耗时
  duration?: number;
  // 请求参数
  params: Record<string, unknown>;
  // 错误信息
  errMessage?: string;
  // 错误录屏数据
  recordscreen?: string;
}

// TODO:资源加载事件
// export interface EventResource extends EventBase {
//   // 资源URL
//   resourceUrl: string;
// }
