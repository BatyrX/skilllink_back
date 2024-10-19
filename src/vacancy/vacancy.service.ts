import { Inject, Injectable } from '@nestjs/common';
import { VacancyDto } from './dto/vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { SkillsService } from 'src/skills/skills.service';
import { SkillDto } from 'src/skills/dto/skill.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy) private vacancyRepository: Repository<Vacancy>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(SkillsService) private skillsService: SkillsService,
  ) {}
  async create(createVacancyDto: VacancyDto) {
    const skills = await Promise.all(
      createVacancyDto.skills.map(async (skill) => {
        const skillDto = new SkillDto();
        skillDto.name = skill;
        return await this.skillsService.create(skillDto);
      }),
    );

    const company = await this.companyRepository.findOne({
      where: { id: createVacancyDto.companyId },
    });
    const author = await this.userRepository.findOne({
      where: { id: createVacancyDto.authorId },
    });
    const vacancy = await this.vacancyRepository.create({
      ...createVacancyDto,
      company,
      author,
      skills,
    });

    return this.vacancyRepository.save(vacancy);
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
