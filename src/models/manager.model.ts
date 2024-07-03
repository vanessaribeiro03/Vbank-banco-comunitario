import { Client } from 'src/models/clients.model';
import { People } from './people.model';

export class Manager extends People {
  public clients: Client[] | undefined;

  constructor(fullName: string, clients: Client[]) {
    super(fullName);
    this.clients = clients;
  }
}
