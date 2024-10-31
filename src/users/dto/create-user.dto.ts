import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: true })
  telegramId: number;

  @ApiProperty({ required: true })
  fullName: string;

  @ApiProperty({ required: false })
  username: string;

  @ApiProperty({ required: true })
  language: string;
}
