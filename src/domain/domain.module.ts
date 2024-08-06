import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { ClientsService } from './services/clients.service';
import { ManagerService } from './services/manager.service';

@Module({
  imports: [],
  providers: [AccountService, ClientsService, ManagerService],
  exports: [AccountService, ClientsService, ManagerService],
})
export class DomainModule {}
