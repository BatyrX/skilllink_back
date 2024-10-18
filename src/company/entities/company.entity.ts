import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.company)
  vacancies: Vacancy[];
}
