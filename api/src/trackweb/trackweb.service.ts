import { Injectable } from '@nestjs/common';
import { PageQueryDto } from './dto/page-query.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, TrackingData, EventInfo } from '@prisma/client';
import { CreateDto } from './dto/create.dto';
import { mapCreateDtoToPrisma } from './mapper/trackweb.mapper';
import { mapResponseFile } from './mapper/fieldFormat.mapper';

type TrackingDataWithEventInfo = TrackingData & {
  eventInfo: EventInfo[];
};

@Injectable()
export class TrackwebService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackwebDto: CreateDto) {
    const { trackingData, eventInfoList } =
      mapCreateDtoToPrisma(createTrackwebDto);

    // 使用事务确保数据一致性
    await this.prisma.$transaction(
      async (prisma) => {
        // 创建TrackingData记录
        const createdTrackingData = await prisma.trackingData.create({
          data: trackingData,
        });
        // 如果有事件信息，则创建关联的EventInfo记录
        if (eventInfoList.length > 0) {
          const eventInfoWithTrackingId = eventInfoList.map((event) => ({
            ...event,
            trackingDataId: createdTrackingData.id,
          }));
          await prisma.eventInfo.createMany({
            data: eventInfoWithTrackingId,
          });
        }
        // 直接返回创建的数据，避免额外查询
        return createdTrackingData;
      },
      {
        timeout: 10000, // 增加超时时间到10秒
      },
    );
    return;
  }

  async findAll(query: PageQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // 构建查询条件
    const where = this.buildWhereCondition(query);

    // 查询数据和总数，包含关联的事件信息
    const [data, total] = await Promise.all([
      this.prisma.trackingData.findMany({
        where,
        skip,
        take: limit,
        orderBy: { sendTime: 'desc' },
        include: {
          eventInfo: true, // 包含关联的事件信息
        },
      }),
      this.prisma.trackingData.count({ where }),
    ]);

    // 处理事件信息
    const records = this.processEventInfo(data as TrackingDataWithEventInfo[]);

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

    // 应用名称过滤（模糊搜索）
    if (appName) {
      where.appName = {
        contains: appName,
        mode: 'insensitive', // 不区分大小写
      };
    }

    // 用户名过滤（模糊搜索）
    if (userName) {
      where.userName = {
        contains: userName,
        mode: 'insensitive', // 不区分大小写
      };
    }

    // 事件类型过滤
    if (eventTypeList?.length) {
      const orConditions: any[] = [];
      eventTypeList.forEach((item: string) => {
        const [eventId, eventType] = item.split('-');
        if (item === 'pageId-pv-duration' || item === 'pageId-pv') {
          // pageId 是随即的，并且eventype 中的 pv-duration 和 pv 是唯一的，因此只用eventType 过滤
          orConditions.push({
            eventType: eventType,
          });
        } else {
          // 普通情况：同时匹配 eventType 和 eventId
          orConditions.push({
            AND: [{ eventType: eventType }, { eventId: eventId }],
          });
        }
      });
      where.eventInfo = {
        some: {
          OR: orConditions,
        },
      };
    }

    return where;
  }

  /**
   * 处理事件信息，提取到外层
   * @param data 原始数据
   * @returns 新的数据结构
   */
  private processEventInfo(data: TrackingDataWithEventInfo[]) {
    return data.map((item) => {
      // 去除eventInfo中不需要的字段 - 不同eventType 不同eventId 需要不同的字段
      const eventInfo = item.eventInfo.map((event) => mapResponseFile(event));
      const eventTypeList = item.eventInfo
        .filter((event) => Boolean(event))
        .map((event: EventInfo) => ({
          eventType: event.eventType,
          eventId: event.eventId,
        }))
        .filter((event) => Boolean(event.eventType));

      // 去重
      const uniqueEventTypeList = Array.from(
        new Set(eventTypeList.map((item) => JSON.stringify(item))),
      ).map(
        (item) => JSON.parse(item) as { eventType: string; eventId: string },
      );

      return {
        ...item,
        eventTypeList: uniqueEventTypeList,
        eventInfo,
      };
    });
  }
}
