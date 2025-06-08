import { PartialType } from '@nestjs/swagger';
import { CreateAnalyzeDto } from './create-analyze.dto';

export class UpdateAnalyzeDto extends PartialType(CreateAnalyzeDto) {}
