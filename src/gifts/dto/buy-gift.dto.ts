import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class SendGiftDto {
  @ApiProperty({ required: true })
  @IsMongoId()
  gift: string;

  @ApiProperty({ required: true })
  @IsMongoId()
  recepient: string;
}
