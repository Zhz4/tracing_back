import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrackwebService } from './trackweb.service';
import { UpdateTrackwebDto } from './dto/update-trackweb.dto';

@Controller('trackweb')
export class TrackwebController {
  constructor(private readonly trackwebService: TrackwebService) {}

  @Post()
  create(@Body() createTrackwebDto: string) {
    return this.trackwebService.create(createTrackwebDto);
  }

  @Get()
  findAll() {
    return this.trackwebService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackwebService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrackwebDto: UpdateTrackwebDto,
  ) {
    return this.trackwebService.update(+id, updateTrackwebDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackwebService.remove(+id);
  }
}
