import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SkillsService } from 'src/skills/skills.service';
import { SkillDto } from 'src/skills/dto/skill.dto';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(SkillsService) private skillsService: SkillsService,
  ) {}
  async create(createUserDto: UserDto) {
    const skills = await Promise.all(
      createUserDto.skills.map(async (skill) => {
        const skillDto = new SkillDto();
        skillDto.name = skill;
        return await this.skillsService.create(skillDto);
      }),
    );

    const user = this.userRepository.create({
      ...createUserDto,
      skills,
    });

    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({ relations: ['skills'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    const skills = await Promise.all(
      updateUserDto.skills.map(async (skill) => {
        const skillDto = new SkillDto();
        skillDto.name = skill;
        return await this.skillsService.create(skillDto);
      }),
    );

    const updatedUser = this.userRepository.create({
      ...updateUserDto,
      skills,
    });

    return this.userRepository.save({ ...updatedUser });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
