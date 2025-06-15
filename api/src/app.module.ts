import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrackwebModule } from './trackweb/trackweb.module';
import { AuthModule } from './auth/auth.module';
import { AnalyzeModule } from './analyze/analyze.module';

@Module({
  imports: [PrismaModule, TrackwebModule, AuthModule, AnalyzeModule],
  providers: [],
})
export class AppModule {}
