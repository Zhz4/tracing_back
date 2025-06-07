import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrackwebModule } from './trackweb/trackweb.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, TrackwebModule, AuthModule],
})
export class AppModule {}
