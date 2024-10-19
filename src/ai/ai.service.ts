import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from 'src/user/entities/user.entity';
import { Vacancy } from 'src/vacancy/entities/vacancy.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Vacancy)
    private vacancyRepository: Repository<Vacancy>,
  ) {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  async getJobRecommendationsForUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['skills'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userSkills = user.skills.map(skill => skill.name);

    const vacancies = await this.vacancyRepository.find({
      relations: ['skills'],
    });

    const matchingVacancies = vacancies.filter(vacancy => 
      vacancy.skills.some(skill => userSkills.includes(skill.name))
    );

    if (matchingVacancies.length === 0) {
      throw new Error('Нет вакансий, соответствующих навыкам пользователя');
    }

    const vacancyNames = matchingVacancies.map(vacancy => vacancy.name);
    const prompt = `Посоветуйте вакансии для человека с навыками: ${userSkills.join(', ')}. Подходящие вакансии: ${vacancyNames.join(', ')}.`;

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      throw new Error(`Ошибка при получении рекомендаций: ${error.message}`);
    }
  }
}
