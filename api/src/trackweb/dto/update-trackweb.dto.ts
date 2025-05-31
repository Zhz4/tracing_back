import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackwebDto } from './create-trackweb.dto';

export class UpdateTrackwebDto extends PartialType(CreateTrackwebDto) {}
