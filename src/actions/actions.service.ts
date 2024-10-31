import { Injectable } from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Action, ActionDocument } from './schemas/action.schema';
import { Model } from 'mongoose';

@Injectable()
export class ActionsService {
  constructor(@InjectModel(Action.name) private actionModel: Model<Action>) {}

  async create(createActionDto: CreateActionDto): Promise<ActionDocument> {
    return await new this.actionModel({
      ...createActionDto,
      timestamp: new Date(),
    }).save();
  }

  async findAll(): Promise<Action[]> {
    return await this.actionModel
      .find()
      .populate('user')
      .populate('gift')
      .populate('recipient')
      .exec();
  }

  async findOne(id: string) {
    return await this.actionModel
      .findById(id)
      .populate('user')
      .populate('gift')
      .populate('recipient')
      .exec();
  }
}
