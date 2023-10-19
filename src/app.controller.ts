import { Body, Controller, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createAccount(): Promise<void> {
    return this.appService.createAccount();
  }

  @Post('/:accountId/transaction')
  async createTransaction(
    @Param('accountId') accountId: any,
    @Body() body: any,
  ): Promise<void> {
    return this.appService.createTransactions({
      account_id: accountId,
      amount: body.amount,
      type: body.type,
    });
  }
}
