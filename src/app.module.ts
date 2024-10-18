import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VacancyModule } from './vacancy/vacancy.module';
import { UserModule } from './user/user.module';
import { SkillsModule } from './skills/skills.module';
import { User } from './user/entities/user.entity';
import { Skill } from './skills/entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite', // путь к файлу базы данных SQLite
      entities: [User, Skill], // массив сущностей
      synchronize: true, // синхронизирует базу данных с моделями (только для разработки)
    }),
    VacancyModule,
    UserModule,
    SkillsModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
