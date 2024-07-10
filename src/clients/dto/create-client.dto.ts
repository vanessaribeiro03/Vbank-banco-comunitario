import { Account } from 'src/models/accounts/account.model';

export class CreateClientDto {
  fullName: string;
  adress: string;
  phoneNumber: string;
  accounts: Account[] = [];
  monthlyIncome: number;
}
