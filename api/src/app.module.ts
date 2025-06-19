import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrackwebModule } from './trackweb/trackweb.module';
import { AuthModule } from './auth/auth.module';
import { AnalyzeModule } from './analyze/analyze.module';
import { TrackUserModule } from './track_user/track_user.module';

@Module({
  imports: [
    PrismaModule,
    TrackwebModule,
    AuthModule,
    AnalyzeModule,
    TrackUserModule,
  ],
})
export class AppModule {}
