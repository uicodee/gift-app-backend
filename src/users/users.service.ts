import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Gift } from 'src/gifts/schemas/gift.schema';
import { OrderBy } from './dto/order-by.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    return await new this.userModel(createUserDto).save();
  }

  async createUserGift(userId: string, giftId: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { gifts: giftId },
      },
      { new: true },
    );
  }

  async createGift(userId: string, giftId: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { purchasedGifts: giftId },
      },
      { new: true },
    );
  }

  async deletePurchasedGift(
    userId: string,
    giftId: string,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { purchasedGifts: giftId },
      },
      { new: true },
    );
  }

  async findAll(orderBy: OrderBy): Promise<UserDocument[]> {
    if (orderBy === OrderBy.default) {
      return this.userModel.find().populate('gifts').exec();
    } else if (orderBy === OrderBy.giftCount) {
      return await this.userModel
        .aggregate([
          {
            $lookup: {
              from: 'gifts',
              localField: 'gifts',
              foreignField: '_id',
              as: 'gifts',
            },
          },
          { $addFields: { giftCount: { $size: '$gifts' } } },
          { $sort: { giftCount: -1 } },
          { $unset: 'giftCount' },
        ])
        .exec();
    }
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return await this.userModel
      .findById(id)
      .populate({ path: 'gifts', model: Gift.name })
      .populate({ path: 'purchasedGifts', model: Gift.name })
      .exec();
  }

  async findOneByTelegramId(telegramId: number): Promise<UserDocument | null> {
    return await this.userModel
      .findOne({ telegramId: telegramId })
      .populate({ path: 'gifts', model: Gift.name })
      .populate({ path: 'purchasedGifts', model: Gift.name })
      .exec();
  }
}
