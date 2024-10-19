import { Injectable } from '@nestjs/common';
import { SkillDto } from './dto/skill.dto';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}
  async create(createSkillDto: SkillDto) {
    const skill = await this.skillRepository.findOne({
      where: { name: createSkillDto.name },
    });

    if (skill) return skill;

    const newSkill = this.skillRepository.create({ name: createSkillDto.name });

    return await this.skillRepository.save(newSkill);
  }

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: number) {
    return this.skillRepository.findOne({ where: { id } });
  }

  update(id: number, updateSkillDto: SkillDto) {
    return this.skillRepository.update(id, updateSkillDto);
  }

  remove(id: number) {
    return this.skillRepository.delete(id);
  }
}
