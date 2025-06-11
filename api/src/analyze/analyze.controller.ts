import { Controller, Get } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { Public } from '@/auth/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('数据分析')
@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Public()
  @ApiOperation({ summary: '页面统计' })
  @Get('page')
  analyzePage() {
    return this.analyzeService.analyzePage();
  }

  @Public()
  @ApiOperation({ summary: '点击统计' })
  @Get('click')
  analyzeClick() {
    return this.analyzeService.analyzeClick();
  }

  @Public()
  @ApiOperation({ summary: '错误统计' })
  @Get('error')
  analyzeError() {
    return this.analyzeService.analyzeError();
  }
}
