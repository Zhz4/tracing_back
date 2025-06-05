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
}

export const EventNames = {
  [`${EventIdEnum.CODE}-${EventTypeEnum.CLICK}`]: "点击事件",
  [`${EventIdEnum.CODE}-${EventTypeEnum.ERROR}`]: "代码错误",
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum.PV}`]: "页面跳转",
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum["PV-DURATION"]}`]: "页面停留",
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum.PERFORMANCE}`]: "资源首次加载",
  [`${EventIdEnum.SERVER}-${EventTypeEnum.PERFORMANCE}`]: "请求事件",
  [`${EventIdEnum.SERVER}-${EventTypeEnum.ERROR}`]: "请求失败",
  [`${EventIdEnum.RESOURCE}-${EventTypeEnum.PERFORMANCE}`]: "资源加载",
} as const;
