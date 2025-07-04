import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TrackwebService } from './trackweb.service';
import { PageQueryDto } from './dto/page-query.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateDto } from './dto/create.dto';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('埋点数据')
@Controller('trackweb')
export class TrackwebController {
  constructor(private readonly trackwebService: TrackwebService) {}

  @Public()
  @ApiOperation({ summary: '创建埋点数据' })
  @ApiResponse({ status: 200, description: '成功返回埋点数据' })
  @Post()
  create(@Body() createTrackwebDto: CreateDto) {
    if (typeof createTrackwebDto === 'string') {
      createTrackwebDto = JSON.parse(createTrackwebDto) as CreateDto;
    }
    return this.trackwebService.create(createTrackwebDto);
  }

  @ApiBearerAuth('auth')
  @ApiOperation({ summary: '分页查询埋点数据' })
  @ApiResponse({ status: 200, description: '成功返回埋点数据' })
  @Post('page')
  findAll(@Body() body: PageQueryDto) {
    return this.trackwebService.findAll(body);
  }

  @ApiBearerAuth('auth')
  @ApiOperation({ summary: '根据id查询埋点数据' })
  @ApiResponse({ status: 200, description: '成功返回埋点数据' })
  @Get('event/:id')
  findEventById(@Param('id') id: string) {
    return this.trackwebService.findEventById(id);
  }

  @ApiBearerAuth('auth')
  @ApiOperation({ summary: '根据事件Id查询录屏数据' })
  @ApiResponse({ status: 200, description: '成功返回录屏数据' })
  @Get('event/:id/screen')
  findEventByEventId(@Param('id') id: string) {
    return this.trackwebService.findEventByEventId(id);
  }
}
