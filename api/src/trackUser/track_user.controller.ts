import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrackUserService } from './track_user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/decorators/public.decorator';
import { GetTrackUserDto } from './dto/get-track_user.dto';

@Controller('trackUser')
@ApiTags('埋点用户')
export class TrackUserController {
  constructor(private readonly trackUserService: TrackUserService) {}

  @Get(':id')
  @Public()
  @ApiOperation({ summary: '根据id获取埋点用户' })
  findOne(@Param('id') id: string) {
    return this.trackUserService.findOne(+id);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: '根据用户名获取埋点用户' })
  findByUserName(@Query() getTrackUserDto: GetTrackUserDto) {
    return this.trackUserService.findByUserName(getTrackUserDto.userName);
  }
}
