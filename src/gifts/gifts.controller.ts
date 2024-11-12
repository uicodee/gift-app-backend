import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BuyGiftDto } from './dto/buy-gift.dto';
import { Gift } from './schemas/gift.schema';
import { TelegramAuth } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';
import { InvoiceCreatedDto } from './dto/invoice.dto';

@ApiTags('gifts')
@ApiBearerAuth('Authorization')
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  // @UseGuards(TelegramAuth)
  // @Post()
  // @ApiCreatedResponse({ type: Gift })
  // @ApiBody({ type: CreateGiftDto })
  // async create(@Body() createGiftDto: CreateGiftDto): Promise<Gift> {
  //   return await this.giftsService.create(createGiftDto);
  // }

  // @UseGuards(TelegramAuth)
  @Post('buy')
  @ApiOkResponse({ type: Gift })
  @ApiResponse({ type: InvoiceCreatedDto })
  async buy(@Body() buyGiftDto: BuyGiftDto) {
    const gift = await this.giftsService.findOne(buyGiftDto.gift);
    return await this.giftsService.createInvoice(gift.currency, gift.price);
  }

  @UseGuards(TelegramAuth)
  @Post('send')
  @ApiOkResponse({ type: Gift })
  async send(
    @Body() buyGiftDto: BuyGiftDto,
    @CurrentUser() user: UserDocument,
  ) {
    return await this.giftsService.buy(buyGiftDto, user);
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
    console.log(id);
    console.log(gift);
    return gift;
  }
}
