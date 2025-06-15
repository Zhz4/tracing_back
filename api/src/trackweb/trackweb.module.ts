import { Module } from '@nestjs/common';
import { TrackwebService } from './trackweb.service';
import { TrackwebController } from './trackweb.controller';
import { KafkaModule } from '../common/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [TrackwebService],
  controllers: [TrackwebController],
})
export class TrackwebModule {}
