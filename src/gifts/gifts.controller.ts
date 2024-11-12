import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SendGiftDto } from './dto/buy-gift.dto';
import { Gift } from './schemas/gift.schema';
import { TelegramAuth } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';

@ApiTags('gifts')
@ApiBearerAuth('Authorization')
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @UseGuards(TelegramAuth)
  @Post('send')
  @ApiOkResponse({ type: Gift })
  async send(
    @Body() sendGiftDto: SendGiftDto,
    @CurrentUser() user: UserDocument,
  ) {
    return await this.giftsService.send(sendGiftDto, user);
  }

  @Get()
  @ApiOkResponse({ type: [Gift] })
  async findAll(): Promise<Gift[]> {
    return await this.giftsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Gift })
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string): Promise<Gift> {
    const gift = await this.giftsService.findOne(id);
    return gift;
  }
}
