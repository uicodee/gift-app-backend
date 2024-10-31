import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class SendGiftDto {
  @ApiProperty({ required: true })
  @IsMongoId()
  recipient: string;

  @ApiProperty({ required: true })
  @IsMongoId()
  gift: string;
}
