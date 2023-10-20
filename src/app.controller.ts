import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createAccount(): Promise<void> {
    return this.appService.createAccount();
  }

  @Post('/:account_id/transaction')
  async createTransaction(
    @Param('account_id') account_id: any,
    @Body() body: any,
  ): Promise<void> {
    return this.appService.createTransactions({
      account_id,
      amount: body.amount,
      type: body.type,
    });
  }
}
