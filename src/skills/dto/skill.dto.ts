import { ApiProperty } from '@nestjs/swagger';

export class SkillDto {
  @ApiProperty()
  name: string;
}
