import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { User } from 'src/user/entities/user.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Vacancy])],
  providers: [AiService],
  controllers: [AiController],
})
export class AiModule {}
