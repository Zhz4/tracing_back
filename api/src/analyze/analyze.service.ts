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
      SELECT 
        e."title", 
        COUNT(*)::int AS views, 
        t."appName"
      FROM "event_info" e
      JOIN "tracking_data" t ON e."trackingDataId" = t."id"
      WHERE e."eventType" = 'click'
      GROUP BY e."title", t."appName"
      ORDER BY views DESC
      LIMIT 10;
    `;
    return data;
  }

  async analyzeError() {
    const result = await this.prisma.$queryRaw`
      SELECT 
        t."appName",
        COUNT(*)::int AS "errorCount"
      FROM "tracking_data" t
      JOIN "event_info" e 
        ON t."id" = e."trackingDataId"
      WHERE e."eventType" = 'error'
      GROUP BY t."appName"
      ORDER BY "errorCount" DESC
      LIMIT 10
    `;
    return result;
  }
}
