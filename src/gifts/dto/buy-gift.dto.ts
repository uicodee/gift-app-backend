import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class BuyGiftDto {
  @ApiProperty({ required: true })
  @IsMongoId()
  gift: string;
}
