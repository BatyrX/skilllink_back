import { Injectable } from '@nestjs/common';
import { VacancyDto } from './dto/vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy) private vacancyRepository: Repository<Vacancy>,
  ) {}
  create(createVacancyDto: VacancyDto) {
    return this.vacancyRepository.create(createVacancyDto);
  }

  findAll() {
    return this.vacancyRepository.find();
  }

  findOne(id: number) {
    return this.vacancyRepository.findOne({ where: { id } });
  }

  update(id: number, updateVacancyDto: VacancyDto) {
    return this.vacancyRepository.update(id, updateVacancyDto);
  }

  remove(id: number) {
    return this.vacancyRepository.delete(id);
  }
}
