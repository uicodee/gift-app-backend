import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Types, HydratedDocument } from 'mongoose';
import { Gift } from 'src/gifts/schemas/gift.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @ApiProperty({ required: true })
  @Prop({ required: true, unique: true })
  telegramId: number;

  @ApiProperty({ required: true })
  @Prop({ required: true })
  fullName: string;

  @ApiProperty({ required: false })
  @Prop({ required: false, unique: true })
  username: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  language: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  profilePhoto: string;

  @ApiProperty({ required: false, type: [Gift] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Gift' }] })
  gifts: Types.Array<Gift>;

  @ApiProperty({ required: false, type: [Gift] })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Gift' }] })
  purchasedGifts: Types.Array<Gift>;
}

export const UserSchema = SchemaFactory.createForClass(User);
