import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './domain/entities/clients.entity';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { Manager } from './domain/entities/manager.entity';
import { Account } from './domain/entities/accounts/account.entity';
import { Transaction } from './domain/entities/transactions.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'bank',
      username: 'postgres',
      password: '54321',
      entities: [Client, Manager, Account, Transaction],
      synchronize: true,
      logging: true,
    }),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
