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

  async createGift(userId: string, giftId: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { gifts: giftId },
      },
      { new: true },
    );
  }

  async findAll(orderBy: OrderBy): Promise<UserDocument[]> {
    console.log(orderBy);
    if (orderBy === OrderBy.default) {
      return this.userModel.find().populate('gifts').exec();
    } else if (orderBy === OrderBy.giftCount) {
      return await this.userModel
        .aggregate([
          { $addFields: { giftCount: { $size: '$gifts' } } },
          {
            $lookup: {
              from: 'gifts',
              localField: 'gifts',
              foreignField: '_id',
              as: 'gifts',
            },
          },
          { $sort: { giftCount: -1 } },
          { $project: { giftCount: 0 } },
        ])
        .exec();
    }
  }

  async findOne(id: string): Promise<UserDocument | null> {
    return await this.userModel
      .findById(id)
      .populate({ path: 'gifts', model: Gift.name })
      .exec();
  }

  async findOneByTelegramId(telegramId: number): Promise<UserDocument | null> {
    return await this.userModel
      .findOne({ telegramId: telegramId })
      .populate({ path: 'gifts', model: Gift.name })
      .exec();
  }
}