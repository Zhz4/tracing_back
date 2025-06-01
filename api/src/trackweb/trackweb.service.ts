import { Injectable } from '@nestjs/common';
import { PageQueryDto } from './dto/page-query.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

interface TrackingPayload {
  baseInfo?: Record<string, unknown>;
  eventInfo?: Record<string, unknown>;
}

@Injectable()
export class TrackwebService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackwebDto: string) {
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

  private parseTrackingData(jsonString: string): TrackingPayload {
    return JSON.parse(jsonString) as TrackingPayload;
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
      sendTime: this.safeString(baseInfo.sendTime),
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
    const where: Prisma.TrackingDataWhereInput = {};

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

    return {
      records: data,
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

  findOne(id: number) {
    return `This action returns a #${id} trackweb`;
  }
}
