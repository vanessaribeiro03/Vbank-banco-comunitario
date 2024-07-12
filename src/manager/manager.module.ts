import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [ClientsModule, AccountModule],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
