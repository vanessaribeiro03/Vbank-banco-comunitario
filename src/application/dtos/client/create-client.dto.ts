import { Account } from 'src/domain/entities/accounts/account.entity';

export class CreateClientDto {
  fullName: string;
  adress: string;
  phoneNumber: string;
  accounts: Account[] = [];
  monthlyIncome: number;
}
