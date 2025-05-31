import { Injectable } from '@nestjs/common';
import { UpdateTrackwebDto } from './dto/update-trackweb.dto';
import { PrismaService } from '../../prisma/prisma.service';

interface TrackingPayload {
  baseInfo?: Record<string, unknown>;
  eventInfo?: Record<string, unknown>;
}

function safeString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function safeNumber(value: unknown): number {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

function safeBigInt(value: unknown): bigint {
  if (typeof value === 'string' || typeof value === 'number') {
    return BigInt(value);
  }
  return BigInt(0);
}

function safeJson(value: unknown): object | undefined {
  if (value && typeof value === 'object') {
    return value;
  }
  return undefined;
}

@Injectable()
export class TrackwebService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackwebDto: string) {
    try {
      console.log('接收到的数据:', JSON.parse(createTrackwebDto));

      // 解析JSON字符串
      const data = JSON.parse(createTrackwebDto) as TrackingPayload;
      const baseInfo = data.baseInfo || {};
      const eventInfo = data.eventInfo || {};

      // 准备存储到数据库的数据
      const trackingData = {
        // baseInfo 字段
        clientHeight: safeNumber(baseInfo.clientHeight),
        clientWidth: safeNumber(baseInfo.clientWidth),
        colorDepth: safeNumber(baseInfo.colorDepth),
        pixelDepth: safeNumber(baseInfo.pixelDepth),
        deviceId: safeString(baseInfo.deviceId),
        screenWidth: safeNumber(baseInfo.screenWidth),
        screenHeight: safeNumber(baseInfo.screenHeight),
        vendor: safeString(baseInfo.vendor),
        platform: safeString(baseInfo.platform),
        userUuid: safeString(baseInfo.userUuid),
        sdkUserUuid: safeString(baseInfo.sdkUserUuid),
        ext: safeJson(baseInfo.ext),
        appName: safeString(baseInfo.appName),
        appCode: safeString(baseInfo.appCode),
        pageId: safeString(baseInfo.pageId),
        sessionId: safeString(baseInfo.sessionId),
        sdkVersion: safeString(baseInfo.sdkVersion),
        ip: safeString(baseInfo.ip),
        sendTime: safeBigInt(baseInfo.sendTime),

        // eventInfo 字段
        eventType: safeString(eventInfo.eventType),
        eventId: safeString(eventInfo.eventId),
        triggerPageUrl: safeString(eventInfo.triggerPageUrl) || null,
        triggerTime: eventInfo.triggerTime
          ? safeBigInt(eventInfo.triggerTime)
          : null,
        eventSendTime: eventInfo.eventSendTime
          ? safeBigInt(eventInfo.eventSendTime)
          : null,

        // 页面浏览事件字段
        referer: safeString(eventInfo.referer) || null,
        title: safeString(eventInfo.title) || null,
        action: safeString(eventInfo.action) || null,

        // 性能事件字段
        tti: eventInfo.tti ? safeNumber(eventInfo.tti) : null,
        ready: eventInfo.ready ? safeNumber(eventInfo.ready) : null,
        loadon: eventInfo.loadon ? safeNumber(eventInfo.loadon) : null,
        firstbyte: eventInfo.firstbyte ? safeNumber(eventInfo.firstbyte) : null,
        ttfb: eventInfo.ttfb ? safeNumber(eventInfo.ttfb) : null,
        trans: eventInfo.trans ? safeNumber(eventInfo.trans) : null,
        dom: eventInfo.dom ? safeNumber(eventInfo.dom) : null,
        res: eventInfo.res ? safeNumber(eventInfo.res) : null,
        ssllink: eventInfo.ssllink ? safeNumber(eventInfo.ssllink) : null,

        // 资源加载事件字段
        initiatorType: safeString(eventInfo.initiatorType) || null,
        transferSize: eventInfo.transferSize
          ? safeNumber(eventInfo.transferSize)
          : null,
        encodedBodySize: eventInfo.encodedBodySize
          ? safeNumber(eventInfo.encodedBodySize)
          : null,
        decodedBodySize: eventInfo.decodedBodySize
          ? safeNumber(eventInfo.decodedBodySize)
          : null,
        duration: eventInfo.duration ? safeNumber(eventInfo.duration) : null,
        startTime: eventInfo.startTime ? safeNumber(eventInfo.startTime) : null,
        fetchStart: eventInfo.fetchStart
          ? safeNumber(eventInfo.fetchStart)
          : null,
        domainLookupStart: eventInfo.domainLookupStart
          ? safeNumber(eventInfo.domainLookupStart)
          : null,
        domainLookupEnd: eventInfo.domainLookupEnd
          ? safeNumber(eventInfo.domainLookupEnd)
          : null,
        connectStart: eventInfo.connectStart
          ? safeNumber(eventInfo.connectStart)
          : null,
        connectEnd: eventInfo.connectEnd
          ? safeNumber(eventInfo.connectEnd)
          : null,
        requestStart: eventInfo.requestStart
          ? safeNumber(eventInfo.requestStart)
          : null,
        responseStart: eventInfo.responseStart
          ? safeNumber(eventInfo.responseStart)
          : null,
        responseEnd: eventInfo.responseEnd
          ? safeNumber(eventInfo.responseEnd)
          : null,
        requestUrl: safeString(eventInfo.requestUrl) || null,

        // 错误事件字段
        errorMessage: safeString(eventInfo.errorMessage) || null,
        errorStack: safeString(eventInfo.errorStack) || null,
        errorLine: eventInfo.errorLine ? safeNumber(eventInfo.errorLine) : null,
        errorColumn: eventInfo.errorColumn
          ? safeNumber(eventInfo.errorColumn)
          : null,
        errorFilename: safeString(eventInfo.errorFilename) || null,

        // 用户行为事件字段
        elementSelector: safeString(eventInfo.elementSelector) || null,
        elementText: safeString(eventInfo.elementText) || null,
        clickX: eventInfo.clickX ? safeNumber(eventInfo.clickX) : null,
        clickY: eventInfo.clickY ? safeNumber(eventInfo.clickY) : null,
      };

      // 存储到数据库
      const result = await this.prisma.trackingData.create({
        data: trackingData,
      });

      console.log('数据已存储到数据库，ID:', result.id);

      return {
        success: true,
        id: result.id,
        message: '追踪数据已成功存储',
      };
    } catch (error) {
      console.error('存储数据时发生错误:', error);
      throw new Error(`数据存储失败: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all trackweb`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trackweb`;
  }

  update(id: number, updateTrackwebDto: UpdateTrackwebDto) {
    console.log('更新数据:', updateTrackwebDto);
    return `This action updates a #${id} trackweb`;
  }

  remove(id: number) {
    return `This action removes a #${id} trackweb`;
  }
}
