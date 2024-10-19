import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { Vacancy } from './entities/vacancy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Company } from 'src/company/entities/company.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vacancy, Company, User, Skill]),
    SkillsModule,
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
