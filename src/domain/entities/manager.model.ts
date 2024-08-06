import { Client } from 'src/domain/entities/clients.model';

import { v4 as uuidv4 } from 'uuid';
import { Account } from './accounts/account.model';

export class Manager {
  public id: string;
  public fullName: string;
  public clients: Client[];

  constructor(fullName: string) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.clients = [];
  }

  public addClients(client: Client): void {
    this.clients.push(client);
  }

  public removeClients(client: Client): void {
    this.clients = this.clients.filter(c => c !== client);
  }

  public openAccount(client: Client, account: Account): void {
    client.openAccount(account);
  }

  public closeAccount(client: Client, account: Account): void {
    client.closeAccount(account);
  }

  public changeAccountType(): void {}
}
