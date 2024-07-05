import { BadRequestException, Injectable } from '@nestjs/common';
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
    console.log('esse é o cliente: ', client.fullName);

    if (!client) {
      throw new Error('Client not found linha 16');
    }

    let account: Account;
    if (type === 'current') {
      account = new CheckingAccount(client);
    } else {
      account = new SavingAccount(client);
    }

    console.log('Conta criada: ', account);

    this.accounts.push(account);
    return account;
  }

  getAllAccounts(): Account[] {
    return this.accounts;
  }

  getAccountByNumber(numberAccount: string): Account {
    return this.accounts.find(
      account => account.numberAccount === numberAccount,
    );
  }

  deposit(numberAccount: string, amount: number): Account {
    console.log('[linha 45]o valor foi: ', amount);

    const account = this.getAccountByNumber(numberAccount);
    if (amount < 0) {
      throw new BadRequestException('Amount is posisite');
    }

    // if(account.type === 'current'){

    // }

    account.balance += amount;
    console.log('[linha 53]o valor foi: ', amount);
    return account;
  }
}
