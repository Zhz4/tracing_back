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

  findOne(id: number) {
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users WHERE "userUuid" = ${id};
    `;
  }

  findByUserName(userName?: string) {
    if (!userName) {
      return this.findAll();
    }
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users WHERE "userName" like '%${userName}%';
    `;
  }
}
