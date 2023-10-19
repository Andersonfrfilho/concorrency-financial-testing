import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './Transactions.entity';
import { TransactionBlocks } from './TransactionsBlocks.entity';
import { TransactionEvents } from './TransactionsEvents.entity';
import {
  TRANSACTION_REPOSITORY,
  TransactionsRepository,
} from './Transactions.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction,
      TransactionEvents,
      TransactionBlocks,
    ]),
  ],
  providers: [
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionsRepository,
    },
  ],
  exports: [TRANSACTION_REPOSITORY],
})
export class TransactionsModule {}
