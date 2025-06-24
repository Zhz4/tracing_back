export enum EventTypeEnum {
  CLICK = 'click',
  ERROR = 'error',
  PV = 'pv',
  PERFORMANCE = 'performance',
  INTERSECTION = 'intersection',
  'PV-DURATION' = 'pv-duration',
}

export enum EventIdEnum {
  CODE = 'code',
  SERVER = 'server',
  RESOURCE = 'resource',
  PAGE_ID = 'pageId',
  PAGE = 'page',
  CONSOLEERROR = 'console.error',
  USER = 'user',
}

export enum EventStatusEnum {
  '点击事件' = '点击事件',
  '代码错误' = '代码错误',
  '控制台错误' = '控制台错误',
  '页面跳转' = '页面跳转',
  '页面停留' = '页面停留',
  '资源首次加载' = '资源首次加载',
  '请求事件' = '请求事件',
  '请求失败' = '请求失败',
  '资源加载' = '资源加载',
  '主动上报错误录屏' = '主动上报错误录屏',
}

export const EventNames = {
  [`${EventIdEnum.CODE}-${EventTypeEnum.ERROR}`]: EventStatusEnum.代码错误,
  [`${EventIdEnum.CONSOLEERROR}-${EventTypeEnum.ERROR}`]:
    EventStatusEnum.控制台错误,
  [`${EventIdEnum.SERVER}-${EventTypeEnum.ERROR}`]: EventStatusEnum.请求失败,
  [`${EventIdEnum.CODE}-${EventTypeEnum.CLICK}`]: EventStatusEnum.点击事件,
  [`${EventIdEnum.SERVER}-${EventTypeEnum.PERFORMANCE}`]:
    EventStatusEnum.请求事件,
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum.PV}`]: EventStatusEnum.页面跳转,
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum['PV-DURATION']}`]:
    EventStatusEnum.页面停留,
  [`${EventIdEnum.PAGE}-${EventTypeEnum.PERFORMANCE}`]:
    EventStatusEnum.资源首次加载,
  [`${EventIdEnum.RESOURCE}-${EventTypeEnum.PERFORMANCE}`]:
    EventStatusEnum.资源加载,
  [`${EventIdEnum.USER}-${EventTypeEnum.ERROR}`]:
    EventStatusEnum.主动上报错误录屏,
} as const satisfies Partial<
  Record<`${EventIdEnum}-${EventTypeEnum}`, keyof typeof EventStatusEnum>
>;
