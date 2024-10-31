import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from './transaction.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'User ID',
  })
  @IsString()
  user: string;

  @ApiProperty({
    enum: TransactionType,
    description: 'Transaction type',
  })
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @ApiProperty({
    description: 'Transaction Amount',
  })
  @IsNumber()
  amount: number;
}
