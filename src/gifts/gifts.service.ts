import { Injectable } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gift, GiftDocument } from './schemas/gift.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { ActionsService } from 'src/actions/actions.service';
import { SendGiftDto } from './dto/buy-gift.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
import { ActionType } from 'src/actions/dto/action.enum';

export interface InvoiceResponse {
  ok: boolean;
  result?: InvoiceResult;
}

export interface InvoiceResult {
  invoice_id: number;
  hash: string;
  currency_type: string;
  asset: string;
  amount: string;
  pay_url: string;
  bot_invoice_url: string;
  mini_app_invoice_url: string;
  web_app_invoice_url: string;
  status: string;
  created_at: string;
  allow_comments: boolean;
  allow_anonymous: boolean;
}

@Injectable()
export class GiftsService {
  constructor(
    @InjectModel(Gift.name) private giftModel: Model<GiftDocument>,
    private userService: UsersService,
    private actionService: ActionsService,
  ) {}

  async create(createGiftDto: CreateGiftDto): Promise<GiftDocument> {
    return new this.giftModel(createGiftDto).save();
  }

  async send(sendGiftDto: SendGiftDto, user: UserDocument) {
    await this.userService.deletePurchasedGift(user.id, sendGiftDto.gift);
    await this.userService.createUserGift(user.id, sendGiftDto.gift);
    await this.actionService.create({
      actionType: ActionType.Send,
      gift: sendGiftDto.gift,
      user: user.id,
      recipient: sendGiftDto.recepient,
    });
    await this.userService.createUserGift(
      sendGiftDto.recepient,
      sendGiftDto.gift,
    );
    await this.actionService.create({
      actionType: ActionType.Receive,
      gift: sendGiftDto.gift,
      user: user.id,
      recipient: sendGiftDto.recepient,
    });
  }

  async findAll(): Promise<GiftDocument[]> {
    return await this.giftModel.find();
  }

  async findOne(id: string): Promise<GiftDocument> {
    return await this.giftModel.findOne({ _id: id });
  }
}
