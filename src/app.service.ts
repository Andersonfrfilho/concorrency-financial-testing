import { Inject, Injectable } from '@nestjs/common';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
} from './modules/accounts/Account.repository';
import {
  TRANSACTION_REPOSITORY,
  TransactionsRepository,
} from './modules/transactions/Transactions.repository';
import { connectionSource } from 'ormconfig';
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
    try {
      await this.accountRepository.save({
        balance: 100,
        limit_account: -30,
      });
    } catch (error) {
      throw error;
    }
  }

  async createTransactions(data: ParamsCreateTransactionDto): Promise<void> {
    if (!connectionSource.isInitialized) {
      connectionSource.initialize();
    }
    let transaction, block;
    const queryRunner = connectionSource.createQueryRunner();
    // const sumBlocks = await this.accountRepository.getAccountSumActiveBlocks({
    //   id: data.account_id,
    // });
    const account = await this.accountRepository.get({ id: data.account_id });
    // if (data.type === 'debit' && data.amount >= account.balance) {
    //   throw new Error('Insufficient Founds');
    // }

    try {
      // await this.transactionRepository.save({
      //   account_id: data.account_id,
      //   amount: data.amount,
      //   description: 'description transactions',
      // });
      // await this.transactionRepository.createEvents({
      //   transaction_id: transaction.id,
      //   amount: data.amount,
      //   type: 'create',
      //   description: 'description transactions',
      // });
      await queryRunner.startTransaction('REPEATABLE READ');
      await this.accountRepository.updateBalance({
        balance:
          data.type === 'debit'
            ? account.balance - data.amount
            : account.balance + data.amount,
        id: account.id,
      });
      await queryRunner.commitTransaction();
      console.log('Passow');
      // await this.transactionRepository.createEvents({
      //   transaction_id: transaction.id,
      //   amount: data.amount,
      //   type: 'done',
      //   description: 'description transactions',
      // });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw Error(error);
    }
  }
}
