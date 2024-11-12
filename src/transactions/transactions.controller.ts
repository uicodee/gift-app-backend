import { Controller, Post, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceService } from 'src/invoice/invoice.service';
import { ActionsService } from 'src/actions/actions.service';
import { ActionType } from 'src/actions/dto/action.enum';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly invoiceService: InvoiceService,
    private readonly actionService: ActionsService,
    // private readonly usersService: UsersService,
    // private readonly giftsService: GiftsService,
  ) {}

  @Post()
  async create(@Req() req: Request) {
    const invoice = await this.invoiceService.findOne(
      // @ts-ignore
      req.body.payload.invoice_id,
    );
    if (invoice.status === 'active') {
      const invoice = await this.invoiceService.findOne(
        // @ts-ignore
        req.body.payload.invoice_id,
      );
      await this.transactionsService.create(invoice.user, invoice.gift);
      await this.actionService.create({
        actionType: ActionType.Buy,
        gift: invoice.gift,
        user: invoice.user,
      });
      await this.invoiceService.update(
        // @ts-ignore
        req.body.payload.invoice_id,
        // @ts-ignore
        req.body.payload.status,
      );
    }
    // Add gift to user
    // Add action user bought gift
    // edit invoice status

    // return this.transactionsService.create(createTransactionDto);
  }
}
// body: {
//     update_id: 758106,
//     update_type: 'invoice_paid',
//     request_date: '2024-11-12T17:11:06.375Z',
//     payload: {
//       invoice_id: 341237,
//       hash: 'IV7JC97PrgJF',
//       currency_type: 'crypto',
//       asset: 'USDT',
//       amount: '10',
//       paid_asset: 'USDT',
//       paid_amount: '10',
//       fee_asset: 'USDT',
//       fee_amount: '0.3',
//       fee: '0.3',
//       fee_in_usd: '0.30047988',
//       pay_url: 'https://t.me/CryptoTestnetBot?start=IV7JC97PrgJF',
//       bot_invoice_url: 'https://t.me/CryptoTestnetBot?start=IV7JC97PrgJF',
//       mini_app_invoice_url: 'https://t.me/CryptoTestnetBot/app?startapp=invoice-IV7JC97PrgJF',
//       web_app_invoice_url: 'https://testnet-app.send.tg/invoices/IV7JC97PrgJF',
//       status: 'paid',
//       created_at: '2024-11-12T17:10:33.055Z',
//       allow_comments: true,
//       allow_anonymous: true,
//       paid_usd_rate: '1.00159961',
//       usd_rate: '1.00159961',
//       paid_at: '2024-11-12T17:10:50.709Z',
//       paid_anonymously: false
//     }
//   }
