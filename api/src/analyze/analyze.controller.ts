import { Controller, Get } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
}
