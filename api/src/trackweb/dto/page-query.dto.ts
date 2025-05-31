import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PageQueryDto {
  @ApiProperty({ description: '页码' })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty({ message: '页码不能为空' })
  page: number;

  @ApiProperty({ description: '每页条数' })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty({ message: '每页条数不能为空' })
  limit: number;
}
