import { AccountType } from 'src/domain/enums/type-account.enum';
import { Account } from './account.entity';
import { CheckingAccount } from './checking-account.entity';
import { SavingAccount } from 'src/domain/entities/accounts/saving-account.entity';

export class AccountFactory {
  static createAccount(type: AccountType, clientId: string): Account {
    const accountTypes = {
      [AccountType.CURRENT]: new CheckingAccount(clientId),
      [AccountType.SAVINGS]: new SavingAccount(clientId),
    };

    const account = accountTypes[type];

    if (!account) {
      throw new Error('Invalid account type');
    }

    return account;
  }
}
