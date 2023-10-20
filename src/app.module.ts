import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './modules/accounts/accounts.module';

import { TransactionsModule } from './modules/transactions/transactions.module';
import { Account } from './modules/accounts/Account.entity';
import { Transaction } from './modules/transactions/Transactions.entity';
import { TransactionEvents } from './modules/transactions/TransactionsEvents.entity';
import { TransactionBlocks } from './modules/transactions/TransactionsBlocks.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: 'localhost',

      url: 'postgres://financial:102030@localhost:5432/financial_db',

      port: 5432,

      username: 'financial',

      password: '102030',

      database: 'financial_db',

      entities: [Account, Transaction, TransactionEvents, TransactionBlocks],
      synchronize: false,
      logging: true,
    }),
    AccountsModule,
    TransactionsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
