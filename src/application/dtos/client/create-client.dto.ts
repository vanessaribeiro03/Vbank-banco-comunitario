import { Account } from 'src/domain/entities/accounts/account.entity';
import { Manager } from 'src/domain/entities/manager.entity';

export class CreateClientDto {
  fullName: string;
  adress: string;
  phoneNumber: string;
  monthlyIncome: number;
  accounts?: Account[] = [];
  manager?: Manager;
}
