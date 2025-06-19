import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  AnalyzeActiveDto,
  HourlyActivityDto,
  WeeklyActivityTrendDto,
} from './dto/analyzeActive.dto';

// 定义事件数据的类型接口
interface EventData {
  eventType: string;
  triggerTime: bigint;
  durationTime: bigint | null;
}

// 定义时间范围的类型接口
interface TimeRange {
  start: Date;
  end: Date;
}

// 定义每日详情的类型接口
interface DailyDetail {
  date: string;
  pageViews: number;
  events: number;
  onlineTime: number;
}

@Injectable()
export class AnalyzeService {
  constructor(private readonly prisma: PrismaService) {}

  async analyzePage() {
    const data = await this.prisma.$queryRaw`
      SELECT "triggerPageUrl" AS url, COUNT(*)::int AS views
      FROM "event_info"
      WHERE "eventType" = 'pv'
      GROUP BY "triggerPageUrl"
      ORDER BY views DESC
      LIMIT 10;
    `;
    return data;
  }

  async analyzeClick() {
    const data = await this.prisma.$queryRaw`
      SELECT 
        e."title", 
        COUNT(*)::int AS views, 
        t."appName"
      FROM "event_info" e
      JOIN "tracking_data" t ON e."trackingDataId" = t."id"
      WHERE e."eventType" = 'click'
      GROUP BY e."title", t."appName"
      ORDER BY views DESC
      LIMIT 10;
    `;
    return data;
  }

  async analyzeError() {
    const result = await this.prisma.$queryRaw`
      SELECT 
        t."appName",
        COUNT(*)::int AS "errorCount"
      FROM "tracking_data" t
      JOIN "event_info" e 
        ON t."id" = e."trackingDataId"
      WHERE e."eventType" = 'error'
      GROUP BY t."appName"
      ORDER BY "errorCount" DESC
      LIMIT 10
    `;
    return result;
  }

  // 用户24小时活跃度分析
  async analyzeActive(query: AnalyzeActiveDto): Promise<HourlyActivityDto[]> {
    const { userUuid } = query;
    // 获取当天的开始和结束时间戳（毫秒）
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfDay = today.getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000; // 加一天

    // 获取用户今天的事件数据
    const events = await this.prisma.eventInfo.findMany({
      where: {
        TrackingData: {
          userUuid: userUuid,
        },
        triggerTime: {
          gte: BigInt(startOfDay),
          lt: BigInt(endOfDay),
        },
      },
      select: {
        eventType: true,
        triggerTime: true,
      },
    });

    // 初始化24小时的数据结构
    const hourlyData: HourlyActivityDto[] = [];
    for (let hour = 0; hour < 24; hour++) {
      hourlyData.push({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        pageViews: 0,
        events: 0,
      });
    }
    // 处理查询到的事件数据
    events.forEach((event) => {
      const eventDate = new Date(Number(event.triggerTime));
      const hour = eventDate.getHours();
      if (hour >= 0 && hour < 24) {
        hourlyData[hour].events += 1;
        if (event.eventType === 'pv') {
          hourlyData[hour].pageViews += 1;
        }
      }
    });
    return hourlyData;
  }

  // 用户7天活跃度分析
  async analyzeActiveWeekly(
    query: AnalyzeActiveDto,
  ): Promise<HourlyActivityDto[]> {
    const { userUuid } = query;
    const result = await this.prisma.$queryRaw`
      SELECT * FROM "active_info" WHERE "userUuid" = ${userUuid}
    `;
    return result as HourlyActivityDto[];
  }

  // 近7天用户活跃度变化趋势分析
  async analyzeWeeklyActivityTrend(
    query: AnalyzeActiveDto,
  ): Promise<WeeklyActivityTrendDto> {
    const { userUuid } = query;
    // 获取时间范围
    const { currentWeekRange, previousWeekRange } = this.getWeekTimeRanges();
    // 查询当前周和前一周的事件数据
    const currentWeekEvents = await this.getEventsInRange(
      userUuid,
      currentWeekRange,
    );
    const previousWeekEvents = await this.getEventsInRange(
      userUuid,
      previousWeekRange,
    );

    // 计算各项指标
    const pageViewGrowth = this.calculatePageViewGrowth(
      currentWeekEvents,
      previousWeekEvents,
    );
    const eventGrowth = this.calculateEventGrowth(
      currentWeekEvents,
      previousWeekEvents,
    );
    const mostActiveHour = this.findMostActiveHour(currentWeekEvents);
    const averageOnlineTime =
      this.calculateAverageOnlineTime(currentWeekEvents);
    const activeDays = this.calculateActiveDays(currentWeekEvents);
    const dailyDetails = this.generateDailyDetails(
      currentWeekEvents,
      currentWeekRange.start,
    );

    return {
      pageViewGrowth,
      eventGrowth,
      mostActiveHour,
      averageOnlineTime,
      activeDays,
      dailyDetails,
    };
  }

  // 获取近7天和前7天的时间范围
  private getWeekTimeRanges(): {
    currentWeekRange: TimeRange;
    previousWeekRange: TimeRange;
  } {
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    // 前一周时间范围
    const previousEndDate = new Date(startDate);
    previousEndDate.setMilliseconds(previousEndDate.getMilliseconds() - 1);

    const previousStartDate = new Date(previousEndDate);
    previousStartDate.setDate(previousStartDate.getDate() - 6);
    previousStartDate.setHours(0, 0, 0, 0);

    return {
      currentWeekRange: {
        start: startDate,
        end: endDate,
      },
      previousWeekRange: {
        start: previousStartDate,
        end: previousEndDate,
      },
    };
  }

  // 查询指定时间范围内的事件数据
  private async getEventsInRange(
    userUuid: string,
    timeRange: TimeRange,
  ): Promise<EventData[]> {
    return await this.prisma.eventInfo.findMany({
      where: {
        TrackingData: {
          userUuid: userUuid,
        },
        triggerTime: {
          gte: BigInt(timeRange.start.getTime()),
          lte: BigInt(timeRange.end.getTime()),
        },
      },
      select: {
        eventType: true,
        triggerTime: true,
        durationTime: true,
      },
      orderBy: {
        triggerTime: 'asc',
      },
    });
  }

  // 计算页面浏览增长率
  private calculatePageViewGrowth(
    currentEvents: EventData[],
    previousEvents: EventData[],
  ): number {
    const currentPageViews = currentEvents.filter(
      (e) => e.eventType === 'pv',
    ).length;
    const previousPageViews = previousEvents.filter(
      (e) => e.eventType === 'pv',
    ).length;

    if (previousPageViews === 0) {
      return currentPageViews > 0 ? 100 : 0;
    }

    const growthRate =
      ((currentPageViews - previousPageViews) / previousPageViews) * 100;
    return Number(growthRate.toFixed(2));
  }

  // 计算事件交互增长率
  private calculateEventGrowth(
    currentEvents: EventData[],
    previousEvents: EventData[],
  ): number {
    const currentEventCount = currentEvents.length;
    const previousEventCount = previousEvents.length;

    if (previousEventCount === 0) {
      return currentEventCount > 0 ? 100 : 0;
    }

    const growthRate =
      ((currentEventCount - previousEventCount) / previousEventCount) * 100;
    return Number(growthRate.toFixed(2));
  }

  // 找出最活跃时段
  private findMostActiveHour(events: EventData[]): string {
    const hourlyStats: Record<number, number> = {};

    // 统计每小时的事件数量
    events.forEach((event) => {
      const hour = new Date(Number(event.triggerTime)).getHours();
      hourlyStats[hour] = (hourlyStats[hour] || 0) + 1;
    });

    // 找出事件最多的小时
    const mostActiveHourNum = Object.keys(hourlyStats).reduce(
      (maxHour, currentHour) => {
        const maxCount = hourlyStats[Number(maxHour)] || 0;
        const currentCount = hourlyStats[Number(currentHour)] || 0;
        return currentCount > maxCount ? currentHour : maxHour;
      },
      '0',
    );

    const startHour = mostActiveHourNum.padStart(2, '0');
    const endHour = String(Number(mostActiveHourNum) + 1).padStart(2, '0');
    return `${startHour}:00-${endHour}:00`;
  }

  // 计算平均在线时长（分钟）
  private calculateAverageOnlineTime(events: EventData[]): number {
    const validDurations = events
      .filter((event) => event.durationTime && event.durationTime > 0)
      .map((event) => Number(event.durationTime));

    if (validDurations.length === 0) {
      return 0;
    }

    const totalDuration = validDurations.reduce(
      (sum, duration) => sum + duration,
      0,
    );
    const averageDurationMs = totalDuration / validDurations.length;
    const averageDurationMinutes = averageDurationMs / 1000 / 60;

    return Number(averageDurationMinutes.toFixed(2));
  }

  // 计算活跃天数
  private calculateActiveDays(events: EventData[]): number {
    const activeDates = new Set<string>();

    events.forEach((event) => {
      const date = new Date(Number(event.triggerTime))
        .toISOString()
        .split('T')[0];
      activeDates.add(date);
    });

    return activeDates.size;
  }

  // 生成每日详情数据
  private generateDailyDetails(
    events: EventData[],
    startDate: Date,
  ): DailyDetail[] {
    const dailyDetails: DailyDetail[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + dayIndex);

      const dayData = this.calculateDayData(events, currentDate);
      dailyDetails.push(dayData);
    }

    return dailyDetails;
  }

  // 计算单日数据
  private calculateDayData(events: EventData[], date: Date): DailyDetail {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    // 筛选当日事件
    const dayEvents = events.filter((event) => {
      const eventTime = Number(event.triggerTime);
      return eventTime >= dayStart.getTime() && eventTime <= dayEnd.getTime();
    });

    const pageViews = dayEvents.filter(
      (event) => event.eventType === 'pv',
    ).length;
    const totalEvents = dayEvents.length;
    const onlineTime = this.calculateAverageOnlineTime(dayEvents);

    return {
      date: date.toISOString().split('T')[0],
      pageViews,
      events: totalEvents,
      onlineTime,
    };
  }
}
