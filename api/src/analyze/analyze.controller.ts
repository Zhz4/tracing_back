import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  HourlyActivityDto,
  WeeklyActivityTrendDto,
  PageVisitStatsWrapperDto,
  UserOverviewStatsDto,
  UserEventStatsDto,
} from './dto/analyzeActive.dto';
import { Public } from '@/auth/decorators/public.decorator';
import { UserUuidValidationPipe } from '@/common/pipes/user-uuid-validation.pipe';

@ApiTags('数据分析')
@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @ApiOperation({ summary: '页面统计' })
  @Get('page')
  @ApiBearerAuth('auth')
  analyzePage() {
    return this.analyzeService.analyzePage();
  }

  @ApiOperation({ summary: '点击统计' })
  @Get('click')
  @ApiBearerAuth('auth')
  analyzeClick() {
    return this.analyzeService.analyzeClick();
  }

  @ApiOperation({ summary: '错误统计' })
  @Get('error')
  @ApiBearerAuth('auth')
  analyzeError() {
    return this.analyzeService.analyzeError();
  }

  @ApiBearerAuth('auth')
  @ApiOperation({
    summary: '用户24小时活跃度分析',
    description:
      '返回指定用户在指定日期（或当天）24小时内每小时的页面浏览量和事件数量分布',
  })
  @ApiResponse({
    status: 200,
    description: '返回24小时活跃度数据',
    type: [HourlyActivityDto],
  })
  @Get('active/:userUuid/day')
  async analyzeActive(
    @Param('userUuid', UserUuidValidationPipe) userUuid: string,
    @Query('timestamp') timestamp?: string,
  ): Promise<HourlyActivityDto[]> {
    const timestampNumber = timestamp ? parseInt(timestamp, 10) : undefined;
    return await this.analyzeService.analyzeActive({
      userUuid,
      timestamp: timestampNumber,
    });
  }

  @ApiBearerAuth('auth')
  @ApiOperation({
    summary: '近7天用户活跃度变化趋势',
    description:
      '分析指定用户近7天的活跃度变化趋势，包括页面浏览增长、事件交互增长、最活跃时段、平均在线时长和活跃天数',
  })
  @ApiResponse({
    status: 200,
    description: '返回7天活跃度趋势分析数据',
    type: WeeklyActivityTrendDto,
  })
  @Get('active/:userUuid/weekly-trend')
  async analyzeWeeklyActivityTrend(
    @Param('userUuid', UserUuidValidationPipe) userUuid: string,
  ): Promise<WeeklyActivityTrendDto> {
    return await this.analyzeService.analyzeWeeklyActivityTrend({ userUuid });
  }

  @ApiOperation({ summary: '页面访问统计' })
  @ApiResponse({
    status: 200,
    description: '返回指定用户访问量最多的前4个页面统计及总体数据',
  })
  @Get('page-visit-stats/:userUuid')
  @Public()
  async analyzePageVisitStats(
    @Param('userUuid', UserUuidValidationPipe) userUuid: string,
  ): Promise<PageVisitStatsWrapperDto> {
    return await this.analyzeService.analyzePageVisitStats({ userUuid });
  }

  @ApiBearerAuth('auth')
  @ApiOperation({
    summary: '用户概览统计',
    description:
      '获取用户的总会话数、页面浏览量、平均会话时长、设备类型、浏览器和地理位置等概览信息',
  })
  @ApiResponse({
    status: 200,
    description: '返回用户概览统计数据',
    type: UserOverviewStatsDto,
  })
  @Get(':userUuid/user-overview')
  async getUserOverviewStats(
    @Param('userUuid', UserUuidValidationPipe) userUuid: string,
  ): Promise<UserOverviewStatsDto> {
    return await this.analyzeService.getUserOverviewStats(userUuid);
  }

  @ApiBearerAuth('auth')
  @ApiOperation({
    summary: '用户事件统计',
    description:
      '统计指定用户各类事件的个数和比例，包括点击事件、错误事件、页面访问等',
  })
  @ApiResponse({
    status: 200,
    description: '返回用户事件统计数据',
    type: UserEventStatsDto,
  })
  @Get(':userUuid/event-stats')
  @Public()
  async getUserEventStats(
    @Param('userUuid', UserUuidValidationPipe) userUuid: string,
  ): Promise<UserEventStatsDto> {
    return await this.analyzeService.getUserEventStats(userUuid);
  }
}
