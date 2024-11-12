import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ActionsModule } from './actions/actions.module';
import { AuthService } from './auth/auth.service';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://uicodee:vAisiSbeaU6CBl0I@cluster0.usfyw.mongodb.net?retryWrites=true&w=majority&appName=Cluster0',
    ),
    TelegrafModule.forRoot({
      token: '7632034749:AAGbVUeE9w52iXQ7sekBEB2Lk4kB8alpuVM',
    }),
    UsersModule,
    GiftsModule,
    TransactionsModule,
    ActionsModule,
    BotModule,
    InvoiceModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
