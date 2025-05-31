import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PageQueryDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty({ message: '页码不能为空' })
  page: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsNotEmpty({ message: '每页条数不能为空' })
  limit: number;
}
