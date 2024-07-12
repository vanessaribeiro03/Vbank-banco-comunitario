import { BadRequestException, Injectable } from '@nestjs/common';
import { Manager } from 'src/models/manager.model';
import { CreateManagerDto } from './dto/create-manager.dto';
import { Client } from 'src/models/clients.model';
import { CreateClientDto } from 'src/clients/dto/create-client.dto';
import { AccountService } from 'src/account/account.service';
import { Account } from 'src/models/accounts/account.model';
import { CheckingAccount } from 'src/models/accounts/checking-account.model';
import { SavingAccount } from 'src/models/accounts/saving-account.model';
import { AccountType } from 'src/enums/type-account.enum';

@Injectable()
export class ManagerService {
  private managers: Manager[] = [];

  constructor(private readonly accountService: AccountService) {}

  createManager(createManagerDto: CreateManagerDto): Manager {
    const { fullName } = createManagerDto;

    const newManager = new Manager(fullName);

    this.managers.push(newManager);
    return newManager;
  }

  getAllManager(): Manager[] {
    return this.managers;
  }

  getManagerById(id: string): Manager {
    return this.managers.find(manager => manager.id === id);
  }

  updateManager(id: string, fullName: string): Manager {
    const manager = this.getManagerById(id);
    if (!manager) {
      return null;
    }

    manager.fullName = fullName;

    return manager;
  }

  addClient(idManager: string, createClientDto: CreateClientDto): Client {
    const manager = this.getManagerById(idManager);
    if (!manager) {
      throw new Error('Manager not found');
    }

    const { fullName, adress, phoneNumber, monthlyIncome } = createClientDto;
    const newClient = new Client(fullName, adress, phoneNumber, monthlyIncome);

    manager.addClients(newClient);
    return newClient;
  }

  removeClient(idManager: string, idClient: string) {
    const manager = this.getManagerById(idManager);
    if (!manager) {
      throw new Error('Manager not found');
    }

    const client = manager.clients.find(c => c.id === idClient);
    if (!client) {
      throw new Error('Client not found');
    }

    manager.removeClients(client);
  }

  openAccountForClient(idManager: string, idClient: string, type: AccountType) {
    const manager = this.getManagerById(idManager);
    if (!manager) {
      throw new Error('Manager not found');
    }

    const client = manager.clients.find(c => c.id === idClient);
    if (!client) {
      throw new Error('Client not found');
    }

    let account: Account;
    if (type === AccountType.CURRENT) {
      account = new CheckingAccount();
    } else if (type === AccountType.SAVINGS) {
      account = new SavingAccount();
    } else {
      throw new BadRequestException('Invalid account type');
    }

    manager.openAccount(client, account);
    return account;
  }

  closeAccountForClient(
    idManager: string,
    idClient: string,
    numberAccount: string,
  ) {
    const manager = this.getManagerById(idManager);

    if (!manager) {
      throw new Error('Manager not found');
    }

    const client = manager.clients.find(c => c.id === idClient);
    if (!client) {
      throw new Error('Client not found');
    }

    const account = client.accounts.find(
      acc => acc.numberAccount === numberAccount,
    );

    if (!account) {
      throw new Error('Account not found');
    }

    manager.closeAccount(client, account);
  }
}
