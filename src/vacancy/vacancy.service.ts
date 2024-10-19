import { Injectable } from '@nestjs/common';
import { VacancyDto } from './dto/vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy) private vacancyRepository: Repository<Vacancy>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createVacancyDto: VacancyDto) {
    const skills = createVacancyDto.skills.map((skill) => ({ name: skill }));
    const company = await this.companyRepository.findOne({
      where: { id: createVacancyDto.companyId },
    });
    const author = await this.userRepository.findOne({
      where: { id: createVacancyDto.authorId },
    });
    return this.vacancyRepository.create({
      ...createVacancyDto,
      skills,
      company,
      author,
    });
  }

  findAll() {
    return this.vacancyRepository.find();
  }

  findOne(id: number) {
    return this.vacancyRepository.findOne({ where: { id } });
  }

  update(id: number, updateVacancyDto: VacancyDto) {
    const skills = updateVacancyDto.skills.map((skill) => ({ name: skill }));
    return this.vacancyRepository.update(id, {
      ...updateVacancyDto,
      skills,
    });
  }

  remove(id: number) {
    return this.vacancyRepository.delete(id);
  }
}
