import { Injectable } from '@nestjs/common';
import { Account } from 'src/models/accounts/account.model';
import { ClientsService } from 'src/clients/clients.service';
import { CheckingAccount } from 'src/models/accounts/checking-account.model';
import { SavingAccount } from 'src/models/accounts/saving-account.model';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];

  constructor(private readonly clientsService: ClientsService) {}

  createAccount(clienteId: string, type: 'current' | 'savings'): Account {
    const client = this.clientsService.getClientById(clienteId);
    if (!client) {
      throw new Error('Client not found linha 16');
    }

    let account: Account;
    if (type === 'current') {
      account = new CheckingAccount(client);
    } else {
      account = new SavingAccount(client);
    }

    this.accounts.push(account);
    return account;
  }

  getAllAccounts(): Account[] {
    return this.accounts;
  }

  getAccountById(numberAccount: string): Account {
    return this.accounts.find(
      account => account.numberAccount === numberAccount,
    );
  }
}
