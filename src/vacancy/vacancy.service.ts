import { Injectable } from '@nestjs/common';
import { VacancyDto } from './dto/vacancy.dto';

@Injectable()
export class VacancyService {
  create(createVacancyDto: VacancyDto) {
    return 'This action adds a new vacancy';
  }

  findAll() {
    return `This action returns all vacancy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacancy`;
  }

  update(id: number, updateVacancyDto: VacancyDto) {
    return `This action updates a #${id} vacancy`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacancy`;
  }
}
