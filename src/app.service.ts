import { Inject, Injectable } from '@nestjs/common';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
} from './modules/accounts/Account.repository';
import {
  TRANSACTION_REPOSITORY,
  TransactionsRepository,
} from './modules/transactions/Transactions.repository';
interface ParamsCreateTransactionDto {
  amount: number;
  account_id: string;
  type: 'debit' | 'credit';
}

@Injectable()
export class AppService {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepository,
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionsRepository,
  ) {}

  async createAccount(): Promise<void> {
    await this.accountRepository.save({
      balance: 100,
      number: 'db6dfb1d-9b2a-4cba-a104-5b67446531ad',
    });
  }

  async createTransactions(data: ParamsCreateTransactionDto): Promise<void> {
    // if (!connectionSource.isInitialized) {
    //   connectionSource.initialize();
    // }
    let transaction, block;
    // const queryRunner = connectionSource.createQueryRunner();
    const sumBlocks = await this.accountRepository.getAccountSumActiveBlocks({
      id: data.account_id,
    });
    console.log('############');
    const account = await this.accountRepository.get({ id: data.account_id });

    if (data.type === 'debit' && sumBlocks + data.amount >= account.balance) {
      throw new Error('Insufficient Founds');
    }

    try {
      transaction = await this.transactionRepository.save({
        account_id: account.id,
        amount: data.amount,
        description: 'description transactions',
      });

      await this.transactionRepository.createEvents({
        transaction_id: transaction.id,
        amount: data.amount,
        type: 'create',
        description: 'description transactions',
      });

      block = await this.transactionRepository.createBlock({
        amount: data.amount,
        transaction_id: transaction.id,
        description: 'description transactions',
        active: true,
      });

      await this.accountRepository.updateBalance({
        balance:
          data.type === 'debit'
            ? account.balance - data.amount
            : account.balance + data.amount,
        id: account.id,
      });

      await this.transactionRepository.createEvents({
        transaction_id: transaction.id,
        amount: data.amount,
        type: 'done',
        description: 'description transactions',
      });
    } catch (error) {
      if (transaction) {
        await this.transactionRepository.createEvents({
          transaction_id: transaction.id,
          amount: transaction.amount,
          type: 'error',
          description: 'error',
        });
        await this.transactionRepository.update({
          id: transaction.id,
          description: 'Error',
        });
      }
      throw Error(error);
    } finally {
      if (block) {
        await this.transactionRepository.updateBlock({
          active: false,
          id: block.id,
        });
      }
    }
  }
}
