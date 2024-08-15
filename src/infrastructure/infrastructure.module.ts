import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/domain/entities/clients.entity';
import { ClientRepository } from './repository/client.repository';
import { Manager } from 'src/domain/entities/manager.entity';
import { Account } from 'src/domain/entities/accounts/account.entity';
import { AccountRepository } from './repository/account.repository';
import { ManagerRepository } from './repository/manager.repository';
import { TransactionRepository } from './repository/transaction.repository';
import { Transaction } from 'src/domain/entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Manager, Account, Transaction])],
  providers: [
    ClientRepository,
    { provide: 'IClientRepository', useClass: ClientRepository },
    AccountRepository,
    { provide: 'IAccountRepository', useClass: AccountRepository },
    ManagerRepository,
    { provide: 'IManagerRepository', useClass: ManagerRepository },
    TransactionRepository,
    { provide: 'ITransactionRepository', useClass: TransactionRepository },
  ],
  exports: [
    'IClientRepository',
    'IAccountRepository',
    'IManagerRepository',
    'ITransactionRepository',
  ],
})
export class InfrastructureModule {}
