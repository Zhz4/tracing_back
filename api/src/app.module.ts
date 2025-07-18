import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrackwebModule } from './trackweb/trackweb.module';
import { AuthModule } from './auth/auth.module';
import { AnalyzeModule } from './analyze/analyze.module';
import { TrackUserModule } from './trackUser/track_user.module';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    PrismaModule,
    TrackwebModule,
    AuthModule,
    AnalyzeModule,
    TrackUserModule,
    SchedulerModule,
  ],
})
export class AppModule {}
