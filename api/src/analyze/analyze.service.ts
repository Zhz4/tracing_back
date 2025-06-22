import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  AnalyzeActiveDto,
  HourlyActivityDto,
  WeeklyActivityTrendDto,
  PageVisitStatsWrapperDto,
} from './dto/analyzeActive.dto';
import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';

// 配置 dayjs 插件
dayjs.extend(duration);

@Injectable()
export class AnalyzeService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 计算增长率
   * @param current 当前值
   * @param previous 之前值
   * @returns 增长率百分比，保留2位小数
   */
  private calculateGrowthRate(current: number, previous: number): number {
    // 如果之前有数据，计算增长率
    if (previous > 0) {
      const growthRate = ((current - previous) / previous) * 100;
      return Number(growthRate.toFixed(2));
    }

    // 如果之前没有数据，当前有数据则增长100%，否则0%
    return current > 0 ? 100 : 0;
  }

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
    const { userUuid, timestamp } = query;

    let startOfDay: number;
    let endOfDay: number;

    if (timestamp) {
      // 如果提供了时间戳，使用指定时间戳对应的那一天
      const targetDate = new Date(timestamp);
      targetDate.setHours(0, 0, 0, 0);
      startOfDay = targetDate.getTime();
      endOfDay = startOfDay + 24 * 60 * 60 * 1000;
    } else {
      // 如果没有提供时间戳，使用今天
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      startOfDay = today.getTime();
      endOfDay = startOfDay + 24 * 60 * 60 * 1000;
    }

    return this.getHourlyActivityData(userUuid, startOfDay, endOfDay);
  }

  // 提取的获取小时活跃度数据的通用方法
  private async getHourlyActivityData(
    userUuid: string,
    startOfDay: number,
    endOfDay: number,
  ): Promise<HourlyActivityDto[]> {
    // 使用原生SQL查询24小时活跃度数据
    const hourlyStatsResult = await this.prisma.$queryRaw<
      Array<{
        hour: number;
        pageViews: bigint;
        events: bigint;
      }>
    >`
      SELECT 
        EXTRACT(HOUR FROM TO_TIMESTAMP(e."triggerTime"::bigint / 1000)) as hour,
        COUNT(CASE WHEN e."eventType" = 'pv' THEN 1 END) as "pageViews",
        COUNT(*) as events
      FROM "event_info" e
      JOIN "tracking_data" t ON e."trackingDataId" = t."id"
      WHERE t."userUuid" = ${userUuid}
        AND e."triggerTime" >= ${BigInt(startOfDay)}
        AND e."triggerTime" < ${BigInt(endOfDay)}
      GROUP BY EXTRACT(HOUR FROM TO_TIMESTAMP(e."triggerTime"::bigint / 1000))
      ORDER BY hour
    `;

    // 初始化24小时的数据结构
    const hourlyData: HourlyActivityDto[] = [];
    for (let hour = 0; hour < 24; hour++) {
      hourlyData.push({
        hour: `${hour.toString().padStart(2, '0')}:00`,
        pageViews: 0,
        events: 0,
      });
    }

    // 填充查询结果
    hourlyStatsResult.forEach((result) => {
      const hour = Number(result.hour);
      if (hour >= 0 && hour < 24) {
        hourlyData[hour].pageViews = Number(result.pageViews);
        hourlyData[hour].events = Number(result.events);
      }
    });

    return hourlyData;
  }

  // 近7天用户活跃度变化趋势分析
  async analyzeWeeklyActivityTrend(
    query: AnalyzeActiveDto,
  ): Promise<WeeklyActivityTrendDto> {
    const { userUuid } = query;

    // 计算时间范围
    const {
      currentWeekStart,
      currentWeekEnd,
      previousWeekStart,
      previousWeekEnd,
    } = this.calculateWeekTimeRange();

    // 获取周统计数据
    const weeklyStats = await this.getWeeklyStatsData(
      userUuid,
      currentWeekStart,
      currentWeekEnd,
      previousWeekStart,
      previousWeekEnd,
    );

    // 获取每日详情数据
    const dailyDetails = await this.getDailyDetailsData(
      userUuid,
      currentWeekStart,
      currentWeekEnd,
    );

    return {
      pageViewGrowth: weeklyStats.pageViewGrowth,
      eventGrowth: weeklyStats.eventGrowth,
      mostActiveHour: weeklyStats.mostActiveHour,
      averageOnlineTime: weeklyStats.averageOnlineTime,
      activeDays: weeklyStats.activeDays,
      dailyDetails,
    };
  }

  /**
   * 计算当前周和前一周的时间范围
   */
  private calculateWeekTimeRange() {
    const currentWeekEnd = new Date();
    currentWeekEnd.setHours(23, 59, 59, 999);

    const currentWeekStart = new Date(currentWeekEnd);
    currentWeekStart.setDate(currentWeekStart.getDate() - 6);
    currentWeekStart.setHours(0, 0, 0, 0);

    const previousWeekEnd = new Date(currentWeekStart);
    previousWeekEnd.setMilliseconds(previousWeekEnd.getMilliseconds() - 1);

    const previousWeekStart = new Date(previousWeekEnd);
    previousWeekStart.setDate(previousWeekStart.getDate() - 6);
    previousWeekStart.setHours(0, 0, 0, 0);

    return {
      currentWeekStart,
      currentWeekEnd,
      previousWeekStart,
      previousWeekEnd,
    };
  }

  /**
   * 获取周统计数据（当前周和前一周的对比数据）
   */
  private async getWeeklyStatsData(
    userUuid: string,
    currentWeekStart: Date,
    currentWeekEnd: Date,
    previousWeekStart: Date,
    previousWeekEnd: Date,
  ) {
    const weeklyStatsResult = await this.prisma.$queryRaw<
      Array<{
        week_type: string;
        page_views: bigint;
        total_events: bigint;
        most_active_hour: number;
        avg_duration_ms: bigint;
        active_days: bigint;
      }>
    >`
      WITH weekly_data AS (
        SELECT 
          CASE 
            WHEN e."triggerTime" >= ${BigInt(currentWeekStart.getTime())} 
                 AND e."triggerTime" <= ${BigInt(currentWeekEnd.getTime())} 
            THEN 'current'
            ELSE 'previous'
          END as week_type,
          e."eventType",
          e."triggerTime",
          e."durationTime",
          EXTRACT(HOUR FROM TO_TIMESTAMP(e."triggerTime"::bigint / 1000)) as hour,
          DATE(TO_TIMESTAMP(e."triggerTime"::bigint / 1000)) as event_date
        FROM "event_info" e
        JOIN "tracking_data" t ON e."trackingDataId" = t."id"
        WHERE t."userUuid" = ${userUuid}
          AND (
            (e."triggerTime" >= ${BigInt(previousWeekStart.getTime())} 
             AND e."triggerTime" <= ${BigInt(previousWeekEnd.getTime())})
            OR
            (e."triggerTime" >= ${BigInt(currentWeekStart.getTime())} 
             AND e."triggerTime" <= ${BigInt(currentWeekEnd.getTime())})
          )
      ),
      hourly_stats AS (
        SELECT 
          week_type,
          hour,
          COUNT(*) as hour_events
        FROM weekly_data 
        WHERE week_type = 'current'
        GROUP BY week_type, hour
      ),
      most_active AS (
        SELECT hour
        FROM hourly_stats
        ORDER BY hour_events DESC
        LIMIT 1
      )
      SELECT 
        w.week_type,
        COUNT(CASE WHEN w."eventType" = 'pv' THEN 1 END) as page_views,
        COUNT(*) as total_events,
        COALESCE((SELECT hour FROM most_active), 0) as most_active_hour,
        COALESCE(AVG(CASE WHEN w."durationTime" > 0 THEN w."durationTime" END), 0)::bigint as avg_duration_ms,
        COUNT(DISTINCT w.event_date) as active_days
      FROM weekly_data w
      GROUP BY w.week_type
      ORDER BY w.week_type
    `;

    // 处理统计结果
    const currentWeekStats = weeklyStatsResult.find(
      (row) => row.week_type === 'current',
    );
    const previousWeekStats = weeklyStatsResult.find(
      (row) => row.week_type === 'previous',
    );

    const currentPageViews = Number(currentWeekStats?.page_views || 0);
    const previousPageViews = Number(previousWeekStats?.page_views || 0);
    const currentEvents = Number(currentWeekStats?.total_events || 0);
    const previousEvents = Number(previousWeekStats?.total_events || 0);

    // 计算增长率
    const pageViewGrowth = this.calculateGrowthRate(
      currentPageViews,
      previousPageViews,
    );
    const eventGrowth = this.calculateGrowthRate(currentEvents, previousEvents);

    // 格式化最活跃时段
    const mostActiveHourNum = Number(currentWeekStats?.most_active_hour || 0);
    const startHour = mostActiveHourNum.toString().padStart(2, '0');
    const endHour = (mostActiveHourNum + 1).toString().padStart(2, '0');
    const mostActiveHour = `${startHour}:00-${endHour}:00`;

    // 计算平均在线时长（分钟）
    const averageOnlineTime = Number(
      (Number(currentWeekStats?.avg_duration_ms || 0) / 1000 / 60).toFixed(2),
    );
    const activeDays = Number(currentWeekStats?.active_days || 0);

    return {
      pageViewGrowth,
      eventGrowth,
      mostActiveHour,
      averageOnlineTime,
      activeDays,
    };
  }

  /**
   * 获取每日详情数据
   */
  private async getDailyDetailsData(
    userUuid: string,
    currentWeekStart: Date,
    currentWeekEnd: Date,
  ) {
    const dailyDetailsResult = await this.prisma.$queryRaw<
      Array<{
        event_date: string;
        page_views: bigint;
        total_events: bigint;
        avg_duration_ms: bigint;
      }>
    >`
      SELECT 
        TO_CHAR(DATE(TO_TIMESTAMP(e."triggerTime"::bigint / 1000)), 'YYYY-MM-DD') as event_date,
        COUNT(CASE WHEN e."eventType" = 'pv' THEN 1 END) as page_views,
        COUNT(*) as total_events,
        COALESCE(AVG(CASE WHEN e."durationTime" > 0 THEN e."durationTime" END), 0)::bigint as avg_duration_ms
      FROM "event_info" e
      JOIN "tracking_data" t ON e."trackingDataId" = t."id"
      WHERE t."userUuid" = ${userUuid}
        AND e."triggerTime" >= ${BigInt(currentWeekStart.getTime())}
        AND e."triggerTime" <= ${BigInt(currentWeekEnd.getTime())}
      GROUP BY DATE(TO_TIMESTAMP(e."triggerTime"::bigint / 1000))
      ORDER BY event_date
    `;

    // 生成每日详情
    const dailyDetails: Array<{
      date: string;
      pageViews: number;
      events: number;
      onlineTime: number;
    }> = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const currentDate = new Date(currentWeekStart);
      currentDate.setDate(currentDate.getDate() + dayIndex);
      const dateStr = currentDate.toISOString().split('T')[0];

      const dayData = dailyDetailsResult.find(
        (row) => row.event_date === dateStr,
      );

      dailyDetails.push({
        date: currentDate.getTime().toString(),
        pageViews: Number(dayData?.page_views || 0),
        events: Number(dayData?.total_events || 0),
        onlineTime: Number(
          (Number(dayData?.avg_duration_ms || 0) / 1000 / 60).toFixed(2),
        ),
      });
    }

    return dailyDetails;
  }

  // 页面访问统计分析
  async analyzePageVisitStats(
    query: AnalyzeActiveDto,
  ): Promise<PageVisitStatsWrapperDto> {
    const { userUuid } = query;

    // 查询页面统计数据（访问量最多的前4个）
    const pageStatsResult = await this.prisma.$queryRaw<
      Array<{
        title: string;
        visitCount: bigint;
        bounceRate: number;
        avgStayTimeMs: bigint;
      }>
    >`
      SELECT 
        e."title",
        COUNT(*) as "visitCount",
        ROUND(
          (COUNT(CASE WHEN e."referer" IS NULL OR e."referer" = '' THEN 1 END) * 100.0 / COUNT(*))::numeric, 
          2
        ) as "bounceRate",
        COALESCE(AVG(e."durationTime"), 0)::bigint as "avgStayTimeMs"
      FROM "event_info" e
      JOIN "tracking_data" t ON e."trackingDataId" = t."id"
      WHERE t."userUuid" = ${userUuid}
        AND e."title" IS NOT NULL 
        AND e."title" != '' 
        AND e."title" != ' '
      GROUP BY e."title"
      ORDER BY COUNT(*) DESC
      LIMIT 4
    `;

    // 查询总统计数据（基于所有页面）
    const totalStatsResult = await this.prisma.$queryRaw<
      Array<{
        totalVisits: bigint;
        avgBounceRate: number;
        avgStayTimeMs: bigint;
      }>
    >`
      SELECT 
        COUNT(*) as "totalVisits",
        ROUND(
          (COUNT(CASE WHEN e."referer" IS NULL OR e."referer" = '' THEN 1 END) * 100.0 / COUNT(*))::numeric, 
          2
        ) as "avgBounceRate",
        COALESCE(AVG(e."durationTime"), 0)::bigint as "avgStayTimeMs"
      FROM "event_info" e
      JOIN "tracking_data" t ON e."trackingDataId" = t."id"
      WHERE t."userUuid" = ${userUuid}
        AND e."title" IS NOT NULL 
        AND e."title" != '' 
        AND e."title" != ' '
    `;

    // 处理查询结果
    const pageStats = pageStatsResult.map((row) => ({
      title: row.title,
      visitCount: Number(row.visitCount),
      bounceRate: Number(row.bounceRate),
      avgStayTimeMs: Number(row.avgStayTimeMs),
    }));

    const totalStats = totalStatsResult[0] || {
      totalVisits: BigInt(0),
      avgBounceRate: 0,
      avgStayTimeMs: BigInt(0),
    };

    return {
      pageStats,
      totalVisits: Number(totalStats.totalVisits),
      avgBounceRate: Number(totalStats.avgBounceRate),
      avgStayTimeMs: Number(totalStats.avgStayTimeMs),
    };
  }
}
