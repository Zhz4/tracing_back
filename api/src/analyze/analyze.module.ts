import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';
import { UserUuidValidationPipe } from '@/common/pipes/user-uuid-validation.pipe';

@Module({
  controllers: [AnalyzeController],
  providers: [AnalyzeService, UserUuidValidationPipe],
})
export class AnalyzeModule {}
