import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  role: number;
  @ApiProperty()
  telegramId: number;
  @ApiProperty()
  telegramUsername: string;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  gender: number;
  @ApiProperty()
  photoUrl: string;
  @ApiProperty()
  resumeUrl: string;
}
