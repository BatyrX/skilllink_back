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

  @Column({ nullable: true })
  firstName: string | null;

  @Column({ nullable: true })
  lastName: string | null;

  @Column({ default: 0 })
  role: number;

  @Column()
  telegramId: number;

  @Column({ nullable: true })
  telegramUsername: string | null;

  @Column({ nullable: true })
  dateOfBirth: Date | null;

  @Column()
  gender: number;

  @Column({ nullable: true })
  photoUrl: string | null;

  @Column({ nullable: true })
  resumeUrl: string | null;

  @ManyToMany(() => Skill, (skill) => skill.users)
  @JoinTable()
  skills: Skill[];
}
