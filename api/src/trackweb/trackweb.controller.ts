import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TrackwebService } from './trackweb.service';
import { PageQueryDto } from './dto/page-query.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDto } from './dto/create.dto';

@ApiTags('埋点数据')
@Controller('trackweb')
export class TrackwebController {
  constructor(private readonly trackwebService: TrackwebService) {}

  @ApiOperation({ summary: '创建埋点数据' })
  @ApiResponse({ status: 200, description: '成功返回埋点数据' })
  @Post()
  create(@Body() createTrackwebDto: CreateDto) {
    return this.trackwebService.create(createTrackwebDto);
  }

  @ApiOperation({ summary: '分页查询埋点数据' })
  @ApiResponse({ status: 200, description: '成功返回埋点数据' })
  @Get()
  findAll(@Query() query: PageQueryDto) {
    return this.trackwebService.findAll(query);
  }
}
