import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ versionKey: false })
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  transactionType: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  timestamp: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
