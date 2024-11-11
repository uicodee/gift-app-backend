import { HttpException, Injectable } from '@nestjs/common';
import { CreateGiftDto } from './dto/create-gift.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gift, GiftDocument } from './schemas/gift.schema';
import { Model } from 'mongoose';
import { BuyGiftDto } from './dto/buy-gift.dto';
import { UsersService } from 'src/users/users.service';
import { ActionsService } from 'src/actions/actions.service';
import { ActionType } from 'src/actions/dto/action.enum';
import { UserDocument } from 'src/users/schemas/user.schema';

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

  async buy(buyGiftDto: BuyGiftDto, user: UserDocument) {
    const gift = await this.findOne(buyGiftDto.gift);
    if (!gift) {
      throw new HttpException('Gift not found', 404);
    }
    await this.actionService.create({
      user: String(user._id),
      gift: String(gift._id),
      actionType: ActionType.Buy,
    });
    await this.userService.createGift(String(user._id), String(gift._id));
  }

  async findAll(): Promise<GiftDocument[]> {
    return await this.giftModel.find();
  }

  async findOne(id: string): Promise<GiftDocument> {
    return await this.giftModel.findOne({ _id: id });
  }

  async createInvoice(currency: string, amount: number) {
    const CryptoBotAPI = require('crypto-bot-api');
    const client = new CryptoBotAPI(
      '286402:AA5Kpc9yA5jGC4MaZxfcaqIQtbU5kd6vlkv',
    );
    const invoice = await client.createInvoice({
      amount: amount,
      asset: currency,
    });

    return { url: invoice.miniAppPayUrl };
  }
}
