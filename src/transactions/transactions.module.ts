import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UsersModule } from 'src/users/users.module';
import { InvoiceModule } from 'src/invoice/invoice.module';
import { ActionsModule } from 'src/actions/actions.module';

@Module({
  imports: [UsersModule, InvoiceModule, ActionsModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
