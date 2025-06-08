import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AnalyzeService {
  constructor(private readonly prisma: PrismaService) {}

  async analyzePage() {
    const data = await this.prisma.$queryRaw`
      SELECT "triggerPageUrl" AS url, COUNT(*)::int AS views
      FROM "event_info"
      WHERE "eventType" = 'pv'
      GROUP BY "triggerPageUrl"
      ORDER BY views DESC
      LIMIT 10;
    `;
    return data;
  }

  async analyzeClick() {
    const data = await this.prisma.$queryRaw`
      SELECT "title", COUNT(*)::int AS views
      FROM "event_info"
      WHERE "eventType" = 'click'
      GROUP BY "title"
      ORDER BY views DESC
      LIMIT 10;
    `;
    return data;
  }

  async analyzeStayTime() {
    const data = await this.prisma.$queryRaw`
      SELECT "triggerPageUrl" AS url, COUNT(*)::int AS views
      FROM "event_info"
      WHERE "eventType" = 'stay-time'
      GROUP BY "triggerPageUrl"
      ORDER BY views DESC
      LIMIT 10;
    `;
    return data;
  }
}
