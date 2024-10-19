import { ApiProperty } from '@nestjs/swagger';

export class VacancyDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  companyId: number;
  @ApiProperty()
  releasedData: Date;
  @ApiProperty()
  skills: string[];
  @ApiProperty()
  city: string;
  @ApiProperty()
  location: string;
  @ApiProperty()
  authorId: number;
}
