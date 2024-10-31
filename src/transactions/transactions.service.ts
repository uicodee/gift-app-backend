import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionDocument> {
    return new this.transactionModel({
      ...createTransactionDto,
      timestamp: new Date(),
    }).save();
  }

  findAll(): Promise<TransactionDocument[]> {
    return this.transactionModel.find();
  }

  findOne(id: string): Promise<TransactionDocument | null> {
    return this.transactionModel.findById(id).exec();
  }
}
