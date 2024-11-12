import { HttpException, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { InvoiceResponse } from './dto/invoice.response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GiftsService } from 'src/gifts/gifts.service';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';
import { InvoiceCreatedDto } from './dto/invoice.dto';
import { Gift } from 'src/gifts/schemas/gift.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    private giftService: GiftsService,
  ) {}
  async create(
    createInvoiceDto: CreateInvoiceDto,
    user,
  ): Promise<InvoiceCreatedDto> {
    const gift = await this.giftService.findOne(createInvoiceDto.gift);
    if (!gift) {
      throw new HttpException('Gift not found', 404);
    }
    const data = JSON.stringify({
      asset: gift.currency,
      amount: gift.price,
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://testnet-pay.crypt.bot/api/createInvoice',
      headers: {
        'Crypto-Pay-API-Token': '19418:AAnoxbznYKMyfuqz4o0CKRJVouAKRB65ZH9',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    try {
      const response: AxiosResponse<InvoiceResponse> =
        await axios.request(config);

      if (response.data.ok && response.data.result) {
        console.log('creating');
        await new this.invoiceModel({
          gift: createInvoiceDto.gift,
          user: user,
          invoiceId: response.data.result.invoice_id,
          hash: response.data.result.hash,
          asset: response.data.result.asset,
          amount: response.data.result.amount,
          status: response.data.result.status,
          miniAppInvoiceUrl: response.data.result.mini_app_invoice_url,
        }).save();
        console.log('created');
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

  // findAll() {
  //   return `This action returns all invoice`;
  // }

  findOne(invoiceId: number) {
    return this.invoiceModel
      .findOne({ invoiceId: invoiceId })
      .populate({ path: 'gift', model: Gift.name })
      .populate({ path: 'user', model: User.name });
  }

  update(invoiceId: number, status: string) {
    return this.invoiceModel.updateOne(
      { invoiceId: invoiceId },
      { $set: { status: status } },
    );
  }

  // remove(id: number) {
  //   return `This action removes a #${id} invoice`;
  // }
}
