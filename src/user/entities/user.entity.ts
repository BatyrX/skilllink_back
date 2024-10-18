import { Skill } from 'src/skills/entities/skill.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  role: number;

  @Column()
  telegramId: number;

  @Column()
  telegramUsername: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  gender: number;

  @Column()
  photoUrl: string;

  @Column()
  resumeUrl: string;

  @ManyToMany(() => Skill, (skill) => skill.users)
  @JoinTable() // Промежуточная таблица для связи
  skills: Skill[];
}
