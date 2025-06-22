import { Module } from '@nestjs/common';
import { TrackUserService } from './track_user.service';
import { TrackUserController } from './track_user.controller';
import { UserUuidValidationPipe } from '@/common/pipes/user-uuid-validation.pipe';

@Module({
  controllers: [TrackUserController],
  providers: [TrackUserService, UserUuidValidationPipe],
})
export class TrackUserModule {}
