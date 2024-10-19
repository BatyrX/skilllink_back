import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
