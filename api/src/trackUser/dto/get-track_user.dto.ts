import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetTrackUserDto {
  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({
    description: '限制数量',
    required: false,
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  limit: number = 10;
}
