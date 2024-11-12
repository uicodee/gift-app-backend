import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema({ versionKey: false })
export class Invoice {
  @ApiProperty({ required: true })
  @Prop({ type: Types.ObjectId, ref: 'Gift', unique: false })
  gift: string;

  @ApiProperty({ required: true })
  @Prop({ type: Types.ObjectId, ref: 'Gift', unique: false })
  user: string;

  @ApiProperty({ required: true })
  @Prop()
  invoiceId: number;

  @ApiProperty({ required: true })
  @Prop({ unique: false })
  hash: string;

  @ApiProperty({ required: true })
  @Prop()
  asset: string;

  @ApiProperty({ required: true })
  @Prop()
  amount: string;

  @ApiProperty({ required: true })
  @Prop()
  status: string;

  @ApiProperty({ required: true })
  @Prop()
  miniAppInvoiceUrl: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
