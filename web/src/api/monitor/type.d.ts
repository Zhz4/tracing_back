export type MonitorData = {
  // 主键
  id: string;

  // ========== baseInfo 字段 ==========
  // 网页可见区高度
  clientHeight: number;
  // 网页可见区宽度
  clientWidth: number;
  // 显示屏幕调色板的比特深度
  colorDepth: number;
  // 显示屏幕的颜色分辨率
  pixelDepth: number;
  // 设备ID
  deviceId: string;
  // 显示屏幕的宽度
  screenWidth: number;
  // 显示屏幕的高度
  screenHeight: number;
  // 浏览器厂商
  vendor: string;
  // 平台信息
  platform: string;
  // 用户UUID
  userUuid: string;
  // 用户名
  userName: string;
  // SDK用户UUID
  sdkUserUuid: string;

  // 应用信息
  // 应用名称
  appName: string;
  // 应用代码
  appCode: string;
  // 页面ID
  pageId: string;
  // 会话ID
  sessionId: string;
  // SDK版本
  sdkVersion: string;
  // IP地址
  ip: string;
  // 发送时间
  sendTime: string;
  // 事件类型
  eventTypeList: EventType[];
  // 扩展字段 (可选)
  ext?: Record<string, unknown> | null;
  // 事件信息 (可选)
  eventInfo?: EventInfo[];
};

export type EventInfo = EventClick | EventError | EventRoute | EventRequest;

export type RecordscreenData = {
  id: string;
  recordscreen: string;
} & (EventError | EventRequest);
