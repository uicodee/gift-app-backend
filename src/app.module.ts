import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ActionsModule } from './actions/actions.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/gift'),
    UsersModule,
    GiftsModule,
    TransactionsModule,
    ActionsModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
