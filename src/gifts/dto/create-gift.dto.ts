import { ApiProperty } from '@nestjs/swagger';
import { CurrencyType } from './currency.enum';
import { IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateGiftDto {
  @ApiProperty({
    description: 'Gift Name',
  })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  variant: string;

  @ApiProperty({
    description: 'Gift Description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Gift Price',
  })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: CurrencyType, description: 'Gift type' })
  @IsEnum(CurrencyType)
  currency: CurrencyType;

  @ApiProperty({
    description: 'Gift image url',
  })
  @IsUrl()
  imageUrl: string;
}
