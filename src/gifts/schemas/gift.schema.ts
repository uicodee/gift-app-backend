import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { CurrencyType } from '../dto/currency.enum';

export type GiftDocument = Gift & Document;

@Schema({ versionKey: false })
export class Gift {
  @ApiProperty({ required: true })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  variant: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  description: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  price: number;

  @ApiProperty({ required: true, enum: CurrencyType })
  @Prop({ required: true })
  currency: string;

  @ApiProperty({ required: true, default: 0 })
  @Prop({ required: true, default: 0 })
  availability: number;

  @ApiProperty({ required: true, default: 0 })
  @Prop({ required: true, default: 0 })
  totalIssued: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  imageUrl: string;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  animationUrl: string;
}

export const GiftSchema = SchemaFactory.createForClass(Gift);
