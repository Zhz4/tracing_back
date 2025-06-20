import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { GetTrackUserDto } from './dto/get-track_user.dto';

@Injectable()
export class TrackUserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(limit: number) {
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users LIMIT ${limit};
    `;
  }

  findOne(userUuid: string) {
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users WHERE "userUuid" = ${userUuid};
    `;
  }

  findByUserName(getTrackUserDto: GetTrackUserDto) {
    if (!getTrackUserDto.userName) {
      return this.findAll(getTrackUserDto.limit);
    }
    const searchPattern = `%${getTrackUserDto.userName}%`;
    return this.prisma.$queryRaw`
      SELECT * FROM tracking_users WHERE "userName" ILIKE ${searchPattern} LIMIT ${getTrackUserDto.limit};
    `;
  }
}
