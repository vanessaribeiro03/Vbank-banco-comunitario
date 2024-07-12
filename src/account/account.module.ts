import { Module } from '@nestjs/common';

import { AccountController } from './account.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { AccountService } from './account.service';

@Module({
  imports: [ClientsModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
