import {
  Injectable,
  PipeTransform,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserUuidValidationPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}
  async transform(value: string): Promise<string> {
    if (!value) {
      throw new BadRequestException('用户ID不能为空');
    }
    try {
      // 查询 TrackingData 表中是否存在此 userUuid
      const userExists = await this.prisma.trackingData.findFirst({
        where: {
          userUuid: value,
        },
        select: {
          userUuid: true,
        },
      });
      if (!userExists) {
        throw new NotFoundException(`用户 ID ${value} 不存在`);
      }
      return value;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('验证用户ID时发生错误');
    }
  }
}
