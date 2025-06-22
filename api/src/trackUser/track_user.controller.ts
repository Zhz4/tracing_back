import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrackUserService } from './track_user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetTrackUserDto } from './dto/get-track_user.dto';
import { UserUuidValidationPipe } from '@/common/pipes/user-uuid-validation.pipe';

@Controller('trackUser')
@ApiTags('埋点用户')
export class TrackUserController {
  constructor(private readonly trackUserService: TrackUserService) {}

  @Get(':id')
  @ApiOperation({ summary: '根据id获取埋点用户' })
  async findOne(@Param('id', UserUuidValidationPipe) id: string): Promise<any> {
    const result = (await this.trackUserService.findOne(id)) as any[];
    return result[0] || null;
  }

  @Get()
  @ApiOperation({ summary: '根据用户名获取埋点用户' })
  findByUserName(@Query() getTrackUserDto: GetTrackUserDto) {
    return this.trackUserService.findByUserName(getTrackUserDto);
  }
}
