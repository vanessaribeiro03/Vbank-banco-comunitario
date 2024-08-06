import { Account } from 'src/domain/entities/accounts/account.model';

export class CreateClientDto {
  fullName: string;
  adress: string;
  phoneNumber: string;
  accounts: Account[] = [];
  monthlyIncome: number;
}
