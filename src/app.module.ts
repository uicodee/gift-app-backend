import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ActionsModule } from './actions/actions.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/gift'),
    MongooseModule.forRoot(
      'mongodb+srv://uicodee:vAisiSbeaU6CBl0I@cluster0.usfyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
    GiftsModule,
    TransactionsModule,
    ActionsModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
