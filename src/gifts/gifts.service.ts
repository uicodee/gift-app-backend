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
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { InvoiceCreatedDto } from './dto/invoice.dto';

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

  async createInvoice(
    currency: string,
    amount: number,
  ): Promise<InvoiceCreatedDto | undefined> {
    const data = JSON.stringify({
      asset: currency,
      amount: amount,
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://pay.crypt.bot/api/createInvoice',
      headers: {
        'Crypto-Pay-API-Token': '286402:AA5Kpc9yA5jGC4MaZxfcaqIQtbU5kd6vlkv',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response: AxiosResponse<InvoiceResponse> =
        await axios.request(config);

      if (response.data.ok && response.data.result) {
        return { url: response.data.result.mini_app_invoice_url };
      } else {
        console.error('Failed to create invoice:', response.data);
        throw new HttpException('Failed to create invoice', 500);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw new HttpException('Error creating invoice', 500);
    }
  }
}
