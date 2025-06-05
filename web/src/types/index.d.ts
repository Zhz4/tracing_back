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

// 首次页面性能数据对象格式
export interface EventFirstResource extends EventBase {
  // dns缓存时间
  appcache: number;
  // dom解析耗时
  dom: number;
  // dns查询耗时
  dns: number;
  // 首包时间
  firstbyte: number;
  // 首屏时间
  fmp: number;
  // 页面完全加载时间
  loadon: number;
  // HTML加载完成时间
  ready: number;
  // 同步资源加载耗时
  res: number;
  // SSL安全连接耗时
  ssllink: number;
  // tcp连接耗时
  tcp: number;
  // 内容传输耗时
  trans: number;
  // 请求响应耗时
  ttfb: number;
  // 首次可交互时间
  tti: number;
  // 重定向时间
  redirect: number;
  // 上一个页面的卸载耗时
  unloadTime: number;
}

export interface EventResource extends EventBase {
  // 资源具体url
  requestUrl: string;
  // 通过某种方式请求的资源,比如script,link
  initiatorType: string;
  // 传输的数据包大小
  transferSize: number;
  // 数据包压缩后大小
  encodedBodySize: number;
  // 数据包解压后大小
  decodedBodySize: number;
  // 加载具体时长
  duration: number;
  // 重定向开始时间
  redirectStart: number;
  // 重定向结束时间
  redirectEnd: number;
  // 	开始时间
  startTime: number;
  // 开始发起请求时间
  fetchStart: number;
  // DNS开始解析时间
  domainLookupStart: number;
  // DNS结束解析时间
  domainLookupEnd: number;
  // 开始建立连接时间
  connectStart: number;
  // 连接建立完成时间
  connectEnd: number;
  // 开始发送数据包时间
  requestStart: number;
  // 开始接收数据包时间
  responseStart: number;
  // 数据包接收完成时间
  responseEnd: number;
}
