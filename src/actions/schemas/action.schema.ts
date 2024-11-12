import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Gift } from 'src/gifts/schemas/gift.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ActionType } from '../dto/action.enum';

export type ActionDocument = HydratedDocument<Action>;

@Schema({ versionKey: false })
export class Action {
  @ApiProperty({ required: true, enum: ActionType })
  @Prop({ required: true })
  actionType: string;

  @ApiProperty({ required: false, type: Gift })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Gift', required: true })
  gift: Gift;

  @ApiProperty({ required: true, type: User })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @ApiProperty({ required: false, type: User })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  recipient?: User;

  @ApiProperty()
  @Prop({ required: true })
  timestamp: Date;
}

export const ActionSchema = SchemaFactory.createForClass(Action);
