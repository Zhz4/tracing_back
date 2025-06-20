import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

// 活跃度分析请求 DTO
export class AnalyzeActiveDto {
  @ApiProperty({ description: '用户UUID' })
  @IsString()
  userUuid: string;
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
