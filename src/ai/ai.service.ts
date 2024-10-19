import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }

  async getJobRecommendationsForUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['skills'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const skills = user.skills.map((skill) => skill.name);

    const prompt = `Посоветуйте вакансии для человека с навыками: ${skills.join(
      ', ',
    )}.`;

    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      throw new Error(`Ошибка при получении рекомендаций: ${error.message}`);
    }
  }
}
