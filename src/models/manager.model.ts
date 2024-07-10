import { Client } from 'src/models/clients.model';
import { People } from './people.model';

export class Manager extends People {
  public clients: Client[];

  constructor(fullName: string, clients: Client[]) {
    super(fullName);
    this.clients = clients;
  }

  public addClients(client: Client): void {
    this.clients.push(client); // da erro aqui (o client retorna undefined)
  }
}
