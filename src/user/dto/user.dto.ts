import { ApiProperty } from '@nestjs/swagger';
import { SkillDto } from 'src/skills/dto/skill.dto';

export class UserDto {
  @ApiProperty()
  firstName: string | null;
  @ApiProperty()
  lastName: string | null;
  @ApiProperty()
  role: number | null;
  @ApiProperty()
  telegramId: number;
  @ApiProperty()
  telegramUsername: string | null;
  @ApiProperty()
  dateOfBirth: Date | null;
  @ApiProperty()
  gender: number;
  @ApiProperty()
  photoUrl: string | null;
  @ApiProperty()
  resumeUrl: string | null;
  @ApiProperty()
  skills: string[];
}
