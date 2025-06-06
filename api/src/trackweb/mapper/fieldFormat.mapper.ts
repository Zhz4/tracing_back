import { Prisma } from '@prisma/client';

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
  CONSOLEERROR = 'console.error',
  PAGE = 'page',
}

type PrismaField = Prisma.EventInfoGetPayload<object>;
const baseFields = [
  'eventId',
  'eventType',
  'triggerTime',
  'sendTime',
  'triggerPageUrl',
] as const satisfies (keyof PrismaField)[];

export const EventNames = {
  // 代码错误
  [`${EventIdEnum.CODE}-${EventTypeEnum.ERROR}`]: [
    ...baseFields,
    'title',
    'params',
    'elementPath',
    'x',
    'y',
  ],
  // 控制台错误
  [`${EventIdEnum.CONSOLEERROR}-${EventTypeEnum.ERROR}`]: [
    ...baseFields,
    'errMessage',
    'errStack',
    'line',
    'col',
    'recordscreen',
    'params',
  ],
  // 页面跳转
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum.PV}`]: [
    ...baseFields,
    'referer',
    'title',
    'action',
  ],
  // 页面停留
  [`${EventIdEnum.PAGE_ID}-${EventTypeEnum['PV-DURATION']}`]: [
    ...baseFields,
    'referer',
    'title',
    'action',
    'durationTime',
  ],
  // 请求事件
  [`${EventIdEnum.SERVER}-${EventTypeEnum.PERFORMANCE}`]: [
    ...baseFields,
    'requestUrl',
    'requestMethod',
    'requestType',
    'responseStatus',
    'duration',
    'params',
  ],
  // 资源首次加载
  [`${EventIdEnum.PAGE}-${EventTypeEnum.PERFORMANCE}`]: [
    ...baseFields,
    'appcache',
    'dom',
    'dns',
    'firstbyte',
    'fmp',
    'loadon',
    'ready',
    'res',
    'ssllink',
    'tcp',
    'trans',
    'ttfb',
    'tti',
    'redirect',
    'unloadTime',
  ],
  // 请求失败
  [`${EventIdEnum.SERVER}-${EventTypeEnum.ERROR}`]: [
    ...baseFields,
    'requestUrl',
    'requestMethod',
    'requestType',
    'responseStatus',
    'params',
    'errMessage',
    'recordscreen',
  ],
  // 资源加载
  [`${EventIdEnum.RESOURCE}-${EventTypeEnum.PERFORMANCE}`]: [
    ...baseFields,
    'requestUrl',
    'initiatorType',
    'transferSize',
    'encodedBodySize',
    'decodedBodySize',
    'duration',
    'redirectStart',
    'redirectEnd',
    'startTime',
    'fetchStart',
    'domainLookupStart',
    'domainLookupEnd',
    'connectStart',
    'connectEnd',
    'requestStart',
    'responseStart',
    'responseEnd',
  ],
} as const satisfies Partial<
  Record<`${EventIdEnum}-${EventTypeEnum}`, (keyof PrismaField)[]>
>;

/**
 * 根据eventType 以及 eventId 返回所需要的字段
 */
export const mapResponseFile = (
  response: PrismaField,
): Partial<PrismaField> => {
  // 检查eventId是否属于预定义的枚举值
  const predefinedEventIds = Object.values(EventIdEnum) as string[];
  let eventCategory: string;
  if (predefinedEventIds.includes(response.eventId)) {
    eventCategory = response.eventId;
  } else {
    eventCategory = EventIdEnum.PAGE_ID;
  }
  const eventName =
    `${eventCategory}-${response.eventType}` as keyof typeof EventNames;
  const allowedFields = EventNames[eventName];

  if (!allowedFields) {
    return {};
  }
  const filteredResponse = Object.fromEntries(
    allowedFields
      .filter((field) => field in response && response[field] !== undefined)
      .map((field) => [field, response[field]]),
  ) as Partial<PrismaField>;

  return filteredResponse;
};
