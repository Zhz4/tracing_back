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
    const result = await this.prisma.$transaction(async (prisma) => {
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

        // 返回包含事件信息的完整数据
        return await prisma.trackingData.findUnique({
          where: { id: createdTrackingData.id },
          include: {
            eventInfo: true,
          },
        });
      }

      return createdTrackingData;
    });

    return result;
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

    // 事件类型过滤 - 现在通过关联表查询
    if (eventTypeList?.length) {
      where.eventInfo = {
        some: {
          eventType: {
            in: eventTypeList,
          },
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
