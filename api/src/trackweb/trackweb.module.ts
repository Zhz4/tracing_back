import { Module } from '@nestjs/common';
import { TrackwebService } from './trackweb.service';
import { TrackwebController } from './trackweb.controller';

@Module({
  providers: [TrackwebService],
  controllers: [TrackwebController],
})
export class TrackwebModule {}
