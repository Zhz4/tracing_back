import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetTrackUserDto {
  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  @IsOptional()
  userName?: string;
}
