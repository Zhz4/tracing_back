import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TrackwebService } from './trackweb.service';
import { PageQueryDto } from './dto/page-query.dto';

@Controller('trackweb')
export class TrackwebController {
  constructor(private readonly trackwebService: TrackwebService) {}

  @Post()
  create(@Body() createTrackwebDto: string) {
    return this.trackwebService.create(createTrackwebDto);
  }

  @Get()
  findAll(@Query() query: PageQueryDto) {
    return this.trackwebService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackwebService.findOne(+id);
  }
}
