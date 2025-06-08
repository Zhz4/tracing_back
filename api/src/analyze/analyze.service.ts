import { Injectable } from '@nestjs/common';
import { CreateAnalyzeDto } from './dto/create-analyze.dto';
import { UpdateAnalyzeDto } from './dto/update-analyze.dto';

@Injectable()
export class AnalyzeService {
  create(createAnalyzeDto: CreateAnalyzeDto) {
    return 'This action adds a new analyze';
  }

  findAll() {
    return `This action returns all analyze`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analyze`;
  }

  update(id: number, updateAnalyzeDto: UpdateAnalyzeDto) {
    return `This action updates a #${id} analyze`;
  }

  remove(id: number) {
    return `This action removes a #${id} analyze`;
  }
}
