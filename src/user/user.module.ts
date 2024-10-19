import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SkillsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
