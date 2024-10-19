import { Controller, Get, Param } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('test/:userId')
  async getRecommendations(@Param('userId') userId: number) {
    try {
      const recommendations = await this.aiService.getJobRecommendationsForUser(userId);
      return { recommendations };
    } catch (error) {
      return { message: error.message };
    }
  }
}
