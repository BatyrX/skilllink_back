import { Company } from 'src/company/entities/company.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Company)
  @JoinColumn()
  company: Company;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  releasedData: Date;

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[];

  @Column()
  city: string;

  @Column()
  location: string;

  @ManyToOne(() => User)
  @JoinColumn()
  author: User;
}
