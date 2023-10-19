import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './Account.entity';
import { Transaction } from '../transactions/Transactions.entity';
import { TransactionBlocks } from '../transactions/TransactionsBlocks.entity';

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY_PROVIDER';

interface UpdatePropsDto {
  id: string;
  balance: number;
}

@Injectable()
export class AccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}
  async save(props: Partial<Account>): Promise<Account> {
    return this.accountRepository.save(props);
  }

  async get(props: Partial<Account>): Promise<Account> {
    return this.accountRepository.findOne({ where: { id: props.id } });
  }

  async updateBalance(props: UpdatePropsDto): Promise<void> {
    await this.accountRepository.update(props.id, {
      balance: props.balance,
    });
  }

  async getAccountSumActiveBlocks(props: Partial<Account>): Promise<number> {
    const account = await this.accountRepository
      .createQueryBuilder('foundUsers')
      .where('foundUsers.id = :id', { id: props.id })
      .leftJoinAndSelect('foundUsers.transactions', 'transactions')
      .leftJoinAndSelect('transactions.blocks', 'blocks')
      .andWhere('blocks.active = :active', { active: true })
      .getOne();

    if (!account) {
      return 0;
    }

    const sumValue = account.transactions.reduce(
      (accumulatorTransaction: number, transaction: Transaction) =>
        accumulatorTransaction +
        transaction.blocks.reduce(
          (accumulatorBlock: number, block: TransactionBlocks) =>
            accumulatorBlock + block.amount,
          0,
        ),
      0,
    );

    return sumValue;
  }
}
