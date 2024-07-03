import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { ManagerModule } from './manager/manager.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [ClientsModule, ManagerModule, AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
