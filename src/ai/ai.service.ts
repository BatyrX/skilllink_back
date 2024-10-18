import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async test() {
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI(
      'AIzaSyB0k5sGf4rJw03D89_vDzGJ31HSEf3_N8A',
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = 'Write a story about a magic backpack.';

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  }
}
