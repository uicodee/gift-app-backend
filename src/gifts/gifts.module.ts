import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gift, GiftSchema } from './schemas/gift.schema';
import { UsersModule } from 'src/users/users.module';
import { ActionsModule } from 'src/actions/actions.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gift.name, schema: GiftSchema }]),
    UsersModule,
    ActionsModule,
    AuthModule,
  ],
  controllers: [GiftsController],
  providers: [GiftsService],
})
export class GiftsModule {}
