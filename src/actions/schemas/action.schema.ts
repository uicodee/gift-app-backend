import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Gift } from 'src/gifts/schemas/gift.schema';

export type ActionDocument = HydratedDocument<Action>;

@Schema({ versionKey: false })
export class Action {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gift', required: true })
  gift: Gift;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  recipient: User;

  @Prop({ required: true })
  actionType: string;

  @Prop({ required: true })
  timestamp: Date;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
