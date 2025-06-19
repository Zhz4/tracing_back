import { Module } from '@nestjs/common';
import { TrackUserService } from './track_user.service';
import { TrackUserController } from './track_user.controller';

@Module({
  controllers: [TrackUserController],
  providers: [TrackUserService],
})
export class TrackUserModule {}
