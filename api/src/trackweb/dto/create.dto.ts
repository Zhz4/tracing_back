import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsArray, IsObject } from 'class-validator';
import { EventInfoDto } from './eventInfo.dto';
import { BaseInfoDto } from './baseInfo.dto';

export class CreateDto {
  @ApiProperty({
    description: '基础信息',
    type: BaseInfoDto,
  })
  @IsObject()
  @IsOptional()
  baseInfo?: BaseInfoDto;

  @ApiProperty({
    description: '事件信息',
    isArray: true,
    type: EventInfoDto,
  })
  @IsArray()
  @IsOptional()
  eventInfo?: EventInfoDto[];
}
