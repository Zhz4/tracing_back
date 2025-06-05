export enum EventTypeEnum {
  CLICK = "click",
  ERROR = "error",
  PV = "pv",
  PERFORMANCE = "performance",
  INTERSECTION = "intersection",
  "PV-DURATION" = "pv-duration",
}

export enum EventIdEnum {
  CODE = "code",
  SERVER = "server",
  RESOURCE = "resource",
  PAGE_ID = "pageId",
  CONSOLEERROR = "console.error",
}

export enum EventStatusEnum {
  "点击事件" = "点击事件",
  "代码错误" = "代码错误",
  "控制台错误" = "控制台错误",
  "页面跳转" = "页面跳转",
  "页面停留" = "页面停留",
  "资源首次加载" = "资源首次加载",
  "请求事件" = "请求事件",
  "请求失败" = "请求失败",
  "资源加载" = "资源加载",
}

export const EventNames = {
  [`${EventIdEnum.CODE}-${EventTypeEnum.CLICK}`]: "点击事件",
  [`${EventIdEnum.CODE}-${EventTypeEnum.ERROR}`]: "代码错误",
  [`${EventIdEnum.CONSOLEERROR}-${EventTypeEnum.ERROR}`]: "控制台错误",
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum.PV}`]: "页面跳转",
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum["PV-DURATION"]}`]: "页面停留",
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum.PERFORMANCE}`]: "资源首次加载",
  [`${EventIdEnum.SERVER}-${EventTypeEnum.PERFORMANCE}`]: "请求事件",
  [`${EventIdEnum.SERVER}-${EventTypeEnum.ERROR}`]: "请求失败",
  [`${EventIdEnum.RESOURCE}-${EventTypeEnum.PERFORMANCE}`]: "资源加载",
} as const satisfies Partial<
  Record<`${EventIdEnum}-${EventTypeEnum}`, keyof typeof EventStatusEnum>
>;
