import { Injectable } from '@nestjs/common';
import { PageQueryDto } from './dto/page-query.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, TrackingData } from '@prisma/client';

interface TrackingPayload {
  baseInfo?: Record<string, unknown>;
  eventInfo?: Record<string, unknown>;
}

@Injectable()
export class TrackwebService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackwebDto: string | object) {
    try {
      const data = this.parseTrackingData(createTrackwebDto);
      const trackingData = this.transformToDbFormat(data);
      const result = await this.saveToDatabase(trackingData);
      return {
        id: result.id,
        message: '追踪数据已成功存储',
      };
    } catch (error) {
      console.error('存储数据时发生错误:', error);
      throw new Error(`数据存储失败: ${error.message}`);
    }
  }

  private parseTrackingData(jsonString: string | object): TrackingPayload {
    try {
      // 如果已经是对象，直接返回
      if (typeof jsonString === 'object' && jsonString !== null) {
        return jsonString as TrackingPayload;
      }

      // 如果是字符串，尝试解析JSON
      return JSON.parse(jsonString) as TrackingPayload;
    } catch (error) {
      console.error('解析追踪数据失败:', error);
      console.error('接收到的数据:', jsonString);
      throw new Error(`数据格式错误: 无法解析追踪数据`);
    }
  }

  private transformToDbFormat(data: TrackingPayload) {
    const { baseInfo = {}, eventInfo = {} } = data;

    return {
      // 基础信息字段
      ...this.mapBaseInfoFields(baseInfo),
      // JSON 字段
      ext: (baseInfo.ext as Prisma.InputJsonValue) || undefined,
      eventInfo: (eventInfo as Prisma.InputJsonValue) || undefined,
    };
  }

  private mapBaseInfoFields(baseInfo: Record<string, unknown>) {
    return {
      clientHeight: Number(baseInfo.clientHeight) || 0,
      clientWidth: Number(baseInfo.clientWidth) || 0,
      colorDepth: Number(baseInfo.colorDepth) || 0,
      pixelDepth: Number(baseInfo.pixelDepth) || 0,
      deviceId: this.safeString(baseInfo.deviceId),
      screenWidth: Number(baseInfo.screenWidth) || 0,
      screenHeight: Number(baseInfo.screenHeight) || 0,
      vendor: this.safeString(baseInfo.vendor),
      platform: this.safeString(baseInfo.platform),
      userUuid: this.safeString(baseInfo.userUuid),
      userName: this.safeString(baseInfo.userName),
      sdkUserUuid: this.safeString(baseInfo.sdkUserUuid),
      appName: this.safeString(baseInfo.appName),
      appCode: this.safeString(baseInfo.appCode),
      pageId: this.safeString(baseInfo.pageId),
      sessionId: this.safeString(baseInfo.sessionId),
      sdkVersion: this.safeString(baseInfo.sdkVersion),
      ip: this.safeString(baseInfo.ip),
      sendTime: this.safeBigInt(baseInfo.sendTime),
    };
  }

  private safeString(value: unknown): string {
    return typeof value === 'string' ? value : '';
  }

  private safeBigInt(value: unknown): bigint {
    if (value && (typeof value === 'string' || typeof value === 'number')) {
      return BigInt(value);
    }
    return BigInt(Date.now());
  }

  private async saveToDatabase(trackingData: Prisma.TrackingDataCreateInput) {
    return await this.prisma.trackingData.create({
      data: trackingData,
    });
  }

  async findAll(query: PageQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // 构建查询条件
    const where = this.buildWhereCondition(query);

    // 查询数据和总数
    const [data, total] = await Promise.all([
      this.prisma.trackingData.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sendTime: 'desc' },
      }),
      this.prisma.trackingData.count({ where }),
    ]);

    // 提取事件信息到外层
    const records = this.getEventInfo(data);

    return {
      records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  /**
   * 构建查询条件
   * @param query 查询参数
   * @returns Prisma查询条件对象
   */
  private buildWhereCondition(
    query: PageQueryDto,
  ): Prisma.TrackingDataWhereInput {
    const { appName, userName, eventTypeList } = query;

    const where: Prisma.TrackingDataWhereInput = {
      // 基础过滤条件：去除脏数据
      userName: { not: '' },
      userUuid: { not: '' },
    };

    // 应用名称过滤
    if (appName) {
      where.appName = appName;
    }

    // 用户名过滤
    if (userName) {
      where.userName = userName;
    }

    // 事件类型过滤
    if (eventTypeList?.length) {
      where.OR = eventTypeList.map((eventType) => ({
        eventInfo: {
          path: ['$[*].eventType'],
          equals: eventType,
        },
      }));
    }

    return where;
  }

  /**
   *  将数据中的eventInfo 提到外层
   * @param data 原数数据
   * @returns 新的数据结构
   */
  private getEventInfo(data: TrackingData[]) {
    return data.map((item) => {
      const eventTypeList = Array.isArray(item.eventInfo)
        ? (
            item.eventInfo as Array<{
              eventType?: string;
              eventId?: string;
            }>
          )
            .map((event) => {
              return {
                eventType: event?.eventType,
                eventId: event?.eventId,
              };
            })
            // 过滤掉 eventType 为 undefined 的元素
            .filter((event): event is { eventType: string; eventId: string } =>
              Boolean(event.eventType),
            )
        : [];
      // 将 eventTypeList 中对象元素去重
      const uniqueEventTypeList = Array.from(
        new Set(eventTypeList.map((item) => JSON.stringify(item))),
      ).map(
        (item) => JSON.parse(item) as { eventType: string; eventId: string },
      );
      return {
        ...item,
        eventTypeList: uniqueEventTypeList,
      };
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} trackweb`;
  }
}
