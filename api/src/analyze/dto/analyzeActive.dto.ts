import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

// 活跃度分析请求 DTO
export class AnalyzeActiveDto {
  @ApiProperty({ description: '用户UUID' })
  @IsString()
  userUuid: string;

  @ApiProperty({
    description: '查询日期的时间戳（毫秒），不传则默认为今天',
    example: 1704067200000,
    required: false,
  })
  @IsOptional()
  timestamp?: number;
}

// 24小时活跃度分析响应 DTO
export class HourlyActivityDto {
  @ApiProperty({ description: '小时时间，格式为 HH:mm', example: '09:00' })
  hour: string;

  @ApiProperty({ description: '页面浏览量', example: 25 })
  pageViews: number;

  @ApiProperty({ description: '总事件数量', example: 65 })
  events: number;
}

// 7天活跃度趋势分析响应 DTO
export class WeeklyActivityTrendDto {
  @ApiProperty({ description: '页面浏览增长率（百分比）', example: 15.5 })
  pageViewGrowth: number;

  @ApiProperty({ description: '事件交互增长率（百分比）', example: 23.2 })
  eventGrowth: number;

  @ApiProperty({ description: '最活跃时段', example: '14:00-15:00' })
  mostActiveHour: string;

  @ApiProperty({ description: '平均在线时长（分钟）', example: 45.8 })
  averageOnlineTime: number;

  @ApiProperty({ description: '活跃天数', example: 5 })
  activeDays: number;

  @ApiProperty({
    description: '7天内每日活跃度详情',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        date: { type: 'string', description: '日期', example: '2024-01-15' },
        pageViews: { type: 'number', description: '页面浏览量', example: 25 },
        events: { type: 'number', description: '事件数量', example: 65 },
        onlineTime: {
          type: 'number',
          description: '在线时长（分钟）',
          example: 45,
        },
      },
    },
  })
  dailyDetails: Array<{
    date: string;
    pageViews: number;
    events: number;
    onlineTime: number;
  }>;
}

// 页面访问统计响应 DTO
export class PageVisitStatsDto {
  @ApiProperty({ description: '页面标题', example: '首页' })
  title: string;

  @ApiProperty({ description: '访问量', example: 108 })
  visitCount: number;

  @ApiProperty({ description: '跳出率（百分比）', example: 12 })
  bounceRate: number;

  @ApiProperty({ description: '平均停留时间（毫秒）', example: 135000 })
  avgStayTimeMs: number;
}

// 页面访问统计总体响应 DTO
export class PageVisitStatsWrapperDto {
  @ApiProperty({
    description: '页面统计数据（访问量最多的前4个）',
    type: [PageVisitStatsDto],
  })
  pageStats: PageVisitStatsDto[];

  @ApiProperty({ description: '总访问量', example: 272 })
  totalVisits: number;

  @ApiProperty({ description: '平均跳出率（百分比）', example: 22 })
  avgBounceRate: number;

  @ApiProperty({ description: '平均停留时间（毫秒）', example: 188000 })
  avgStayTimeMs: number;

  @ApiProperty({ description: '总停留时间（毫秒）', example: 51136000 })
  totalStayTimeMs: number;
}

// 用户概览统计数据响应 DTO
export class UserOverviewStatsDto {
  @ApiProperty({ description: '用户姓名', example: '张三' })
  userName: string;

  @ApiProperty({ description: '总会话数', example: 15 })
  totalSessions: number;

  @ApiProperty({ description: '总页面浏览量', example: 108 })
  totalPageViews: number;

  @ApiProperty({ description: '总事件数', example: 245 })
  totalEvents: number;

  @ApiProperty({ description: '平均会话时长（分钟）', example: 25.5 })
  avgSessionDuration: number;

  @ApiProperty({ description: '设备类型', example: 'Win32' })
  deviceType: string;

  @ApiProperty({ description: '浏览器类型', example: 'Google Inc.' })
  browserType: string;

  @ApiProperty({
    description: 'IP地址（地理位置信息）',
    example: '192.168.1.1',
  })
  location: string;

  @ApiProperty({ description: 'IP地址', example: '192.168.1.1' })
  ip: string;

  @ApiProperty({ description: '首次访问时间', example: '2024-01-15T10:30:00Z' })
  firstVisit: string;

  @ApiProperty({ description: '最近访问时间', example: '2024-01-20T16:45:00Z' })
  lastVisit: string;
}
