import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { ClientsController } from './controllers/clients.controller';
import { ManagerController } from './controllers/manager.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
  imports: [DomainModule],
  controllers: [AccountController, ClientsController, ManagerController],
  providers: [],
})
export class ApplicationModule {}
