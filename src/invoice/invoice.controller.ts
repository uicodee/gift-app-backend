import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';
import { TelegramAuth } from 'src/auth/guards/auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceCreatedDto } from './dto/invoice.dto';

@ApiTags('invoice')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(TelegramAuth)
  @Post()
  @ApiOkResponse({ type: InvoiceCreatedDto })
  create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.invoiceService.create(createInvoiceDto, user.id);
  }

  // @Get()
  // findAll() {
  //   return this.invoiceService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.invoiceService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoiceService.update(+id, updateInvoiceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.invoiceService.remove(+id);
  // }
}
