// export const mapCreateUserDtoToPrisma = (dto: CreateUserDto) => {
//   return {
//     name: dto.name,
//     email: dto.email,
//     password: dto.password,
//   };
// };

import { CreateDto } from '../dto/create.dto';
import { BaseInfoDto } from '../dto/baseInfo.dto';
import { EventInfoDto } from '../dto/eventInfo.dto';
import { Prisma } from '@prisma/client';

/**
 * 通用转换工具函数
 */
const toBigInt = (value?: number): bigint => {
  if (value) {
    // 如果是小数，先转为整数（向下取整）
    return BigInt(Math.floor(value));
  }
  return BigInt(Date.now());
};

const toOptionalBigInt = (value?: number): bigint | undefined => {
  if (value) {
    // 如果是小数，先转为整数（向下取整）
    return BigInt(Math.floor(value));
  }
  return undefined;
};

/**
 * 将BaseInfoDto映射到TrackingData的Prisma创建数据
 */
export const mapBaseInfoDtoToPrisma = (
  baseInfo: BaseInfoDto,
): Prisma.TrackingDataCreateInput => ({
  clientHeight: baseInfo.clientHeight || 0,
  clientWidth: baseInfo.clientWidth || 0,
  colorDepth: baseInfo.colorDepth || 0,
  pixelDepth: baseInfo.pixelDepth || 0,
  deviceId: baseInfo.deviceId || '',
  screenWidth: baseInfo.screenWidth || 0,
  screenHeight: baseInfo.screenHeight || 0,
  vendor: baseInfo.vendor || '',
  platform: baseInfo.platform || '',
  userUuid: baseInfo.userUuid || '',
  userName: baseInfo.userName || '',
  sdkUserUuid: baseInfo.sdkUserUuid || '',
  appName: baseInfo.appName || '',
  appCode: baseInfo.appCode || '',
  pageId: baseInfo.pageId || '',
  sessionId: baseInfo.sessionId || '',
  sdkVersion: baseInfo.sdkVersion || '',
  ip: baseInfo.ip || '',
  sendTime: toBigInt(baseInfo.sendTime),
  ext: baseInfo.ext ? (baseInfo.ext as Prisma.InputJsonValue) : undefined,
});

/**
 * 将单个EventInfoDto映射到EventInfo的Prisma创建数据
 */
const mapEventInfoItem = (
  event: EventInfoDto,
): Prisma.EventInfoCreateManyInput => ({
  eventId: event.eventId || '',
  eventType: event.eventType || '',
  triggerTime: toBigInt(event.triggerTime),
  sendTime: toBigInt(event.sendTime),
  triggerPageUrl: event.triggerPageUrl || '',
  title: event.title,
  params: event.params ? (event.params as Prisma.InputJsonValue) : undefined,
  elementPath: event.elementPath,
  x: event.x,
  y: event.y,
  errMessage: event.errMessage,
  errStack: event.errStack,
  line: event.line,
  col: event.col,
  recordscreen: event.recordscreen,
  referer: event.referer,
  action: event.action,
  durationTime: toOptionalBigInt(event.durationTime),
  requestUrl: event.requestUrl,
  requestMethod: event.requestMethod,
  requestType: event.requestType,
  responseStatus: event.responseStatus,
  duration: toOptionalBigInt(event.duration),
  appcache: toOptionalBigInt(event.appcache),
  dom: toOptionalBigInt(event.dom),
  dns: toOptionalBigInt(event.dns),
  firstbyte: toOptionalBigInt(event.firstbyte),
  fmp: toOptionalBigInt(event.fmp),
  loadon: toOptionalBigInt(event.loadon),
  ready: toOptionalBigInt(event.ready),
  res: toOptionalBigInt(event.res),
  ssllink: toOptionalBigInt(event.ssllink),
  tcp: toOptionalBigInt(event.tcp),
  trans: toOptionalBigInt(event.trans),
  ttfb: toOptionalBigInt(event.ttfb),
  tti: toOptionalBigInt(event.tti),
  redirect: toOptionalBigInt(event.redirect),
  unloadTime: toOptionalBigInt(event.unloadTime),
  initiatorType: event.initiatorType,
  transferSize: toOptionalBigInt(event.transferSize),
  encodedBodySize: toOptionalBigInt(event.encodedBodySize),
  decodedBodySize: toOptionalBigInt(event.decodedBodySize),
  redirectStart: toOptionalBigInt(event.redirectStart),
  redirectEnd: toOptionalBigInt(event.redirectEnd),
  startTime: toOptionalBigInt(event.startTime),
  fetchStart: toOptionalBigInt(event.fetchStart),
  domainLookupStart: toOptionalBigInt(event.domainLookupStart),
  domainLookupEnd: toOptionalBigInt(event.domainLookupEnd),
  connectStart: toOptionalBigInt(event.connectStart),
  connectEnd: toOptionalBigInt(event.connectEnd),
  requestStart: toOptionalBigInt(event.requestStart),
  responseStart: toOptionalBigInt(event.responseStart),
  responseEnd: toOptionalBigInt(event.responseEnd),
});

/**
 * 将EventInfoDto数组映射到EventInfo的Prisma创建数据
 */
export const mapEventInfoDtoToPrisma = (
  eventInfo: EventInfoDto[],
): Prisma.EventInfoCreateManyInput[] => eventInfo.map(mapEventInfoItem);

/**
 * 将CreateDto映射到完整的Prisma创建数据
 */
export const mapCreateDtoToPrisma = (dto: CreateDto) => {
  const baseData = dto.baseInfo
    ? mapBaseInfoDtoToPrisma(dto.baseInfo)
    : mapBaseInfoDtoToPrisma({});

  return {
    trackingData: baseData,
    eventInfoList: dto.eventInfo ? mapEventInfoDtoToPrisma(dto.eventInfo) : [],
  };
};
