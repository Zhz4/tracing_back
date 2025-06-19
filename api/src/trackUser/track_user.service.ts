import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class TrackUserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users;
    `;
  }

  findOne(userUuid: string) {
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users WHERE "userUuid" = ${userUuid};
    `;
  }

  findByUserName(userName?: string) {
    if (!userName) {
      return this.findAll();
    }
    const searchPattern = `%${userName}%`;
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users WHERE "userName" ILIKE ${searchPattern};
    `;
  }
}
