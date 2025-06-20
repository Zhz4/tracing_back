import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SchedulerService } from './scheduler.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Public } from '@/auth/decorators/public.decorator';

@ApiTags('定时任务管理')
@Controller('scheduler')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post('refresh-tracking-users')
  @Public()
  @ApiOperation({ summary: '手动刷新tracking_users物化视图' })
  @ApiResponse({
    status: 200,
    description: '刷新成功',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
      },
    },
  })
  async refreshTrackingUsersView() {
    return await this.schedulerService.manualRefreshTrackingUsersView();
  }
}
