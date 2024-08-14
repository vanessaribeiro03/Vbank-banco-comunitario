import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { ClientsService } from './services/clients.service';
import { ManagerService } from './services/manager.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/clients.entity';
import { Account } from './entities/accounts/account.entity';
import { Manager } from './entities/manager.entity';
import { Transaction } from './entities/transactions.entity';

@Module({
  imports: [
    InfrastructureModule,
    TypeOrmModule.forFeature([Client, Account, Manager, Transaction]),
  ],
  providers: [AccountService, ClientsService, ManagerService],
  exports: [AccountService, ClientsService, ManagerService],
})
export class DomainModule {}
