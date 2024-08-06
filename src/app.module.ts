import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [DomainModule, ApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
