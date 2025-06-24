import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_2_HOURS, {
    name: 'refresh-tracking-users-view',
    timeZone: 'Asia/Shanghai',
  })
  async refreshTrackingUsersView() {
    try {
      this.logger.log('开始刷新 tracking_users 物化视图...');

      // 执行物化视图刷新
      await this.prismaService
        .$executeRaw`REFRESH MATERIALIZED VIEW tracking_users`;

      this.logger.log('tracking_users 物化视图刷新成功');
    } catch (error) {
      this.logger.error('刷新 tracking_users 物化视图失败:', error);
      throw error;
    }
  }

  // 提供手动刷新接口（可选）
  async manualRefreshTrackingUsersView() {
    try {
      this.logger.log('手动刷新 tracking_users 物化视图...');

      await this.prismaService
        .$executeRaw`REFRESH MATERIALIZED VIEW tracking_users`;

      this.logger.log('手动刷新 tracking_users 物化视图成功');
      return { success: true, message: '物化视图刷新成功' };
    } catch (error) {
      this.logger.error('手动刷新 tracking_users 物化视图失败:', error);
      throw error;
    }
  }
}
