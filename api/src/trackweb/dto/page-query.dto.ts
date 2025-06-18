import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
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

  @ApiProperty({ description: '应用名称', required: false })
  @IsArray()
  @IsOptional()
  appNameList?: string[];

  @ApiProperty({ description: '用户名', required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ description: '事件类型', required: false, type: [String] })
  @IsArray()
  @IsOptional()
  eventTypeList?: string[];
}
