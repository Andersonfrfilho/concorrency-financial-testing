import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './Account.entity';
import { ACCOUNT_REPOSITORY, AccountRepository } from './Account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountRepository,
    },
  ],
  exports: [ACCOUNT_REPOSITORY],
})
export class AccountsModule {}
