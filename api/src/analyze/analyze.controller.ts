import { Controller, Get, Query } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AnalyzeActiveDto,
  HourlyActivityDto,
  WeeklyActivityTrendDto,
} from './dto/analyzeActive.dto';
import { Public } from '@/auth/decorators/public.decorator';

@ApiTags('数据分析')
@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @ApiOperation({ summary: '页面统计' })
  @Get('page')
  analyzePage() {
    return this.analyzeService.analyzePage();
  }

  @ApiOperation({ summary: '点击统计' })
  @Get('click')
  analyzeClick() {
    return this.analyzeService.analyzeClick();
  }

  @ApiOperation({ summary: '错误统计' })
  @Get('error')
  analyzeError() {
    return this.analyzeService.analyzeError();
  }

  @Public()
  @ApiOperation({
    summary: '用户24小时活跃度分析',
    description: '返回指定用户在当天24小时内每小时的页面浏览量和事件数量分布',
  })
  @ApiResponse({
    status: 200,
    description: '返回24小时活跃度数据',
    type: [HourlyActivityDto],
  })
  @Get('active')
  analyzeActive(
    @Query() query: AnalyzeActiveDto,
  ): Promise<HourlyActivityDto[]> {
    return this.analyzeService.analyzeActive(query);
  }

  @Public()
  @ApiOperation({ summary: '用户7天活跃度分析' })
  @Get('active/weekly')
  analyzeActiveWeekly(@Query() query: AnalyzeActiveDto) {
    return this.analyzeService.analyzeActiveWeekly(query);
  }

  @Public()
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
  @Get('active/weekly-trend')
  analyzeWeeklyActivityTrend(
    @Query() query: AnalyzeActiveDto,
  ): Promise<WeeklyActivityTrendDto> {
    return this.analyzeService.analyzeWeeklyActivityTrend(query);
  }
}
