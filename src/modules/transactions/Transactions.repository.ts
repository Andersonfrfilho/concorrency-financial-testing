import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './Transactions.entity';
import { TransactionEvents } from './TransactionsEvents.entity';
import { TransactionBlocks } from './TransactionsBlocks.entity';

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY_PROVIDER';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionEvents)
    private transactionEventsRepository: Repository<TransactionEvents>,
    @InjectRepository(TransactionBlocks)
    private transactionBlocksRepository: Repository<TransactionBlocks>,
  ) {}
  async save(props: Partial<Transaction>): Promise<Transaction> {
    return this.transactionRepository.save(props);
  }

  async createBlock(
    props: Partial<TransactionBlocks>,
  ): Promise<TransactionBlocks> {
    return this.transactionBlocksRepository.save(props);
  }

  async updateBlock(props: Partial<TransactionBlocks>): Promise<void> {
    await this.transactionBlocksRepository.update(props.id, {
      active: props.active,
    });
  }

  async update(props: Partial<Transaction>): Promise<void> {
    await this.transactionRepository.update(props.id, {
      description: props.description,
    });
  }
  async createEvents(
    props: Partial<TransactionEvents>,
  ): Promise<TransactionEvents> {
    return this.transactionEventsRepository.save(props);
  }
}
