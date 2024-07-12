import { Injectable } from '@nestjs/common';
import { Client } from '../models/clients.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  private clients: Client[] = [];

  createClient(createClientDto: CreateClientDto): Client {
    const { fullName, adress, phoneNumber, monthlyIncome } = createClientDto;

    const newClient = new Client(fullName, adress, phoneNumber, monthlyIncome);

    this.clients.push(newClient);
    return newClient;
  }

  getAllClients(): Client[] {
    return this.clients;
  }

  getClientById(id: string): Client {
    return this.clients.find(client => client.id === id);
  }

  updateClient(id: string, updates: UpdateClientDto): Client {
    const client = this.getClientById(id);
    if (!client) {
      return null;
    }

    const fields = ['fullName', 'adress', 'phoneNumber'];

    Object.keys(updates).forEach(key => {
      if (fields.includes(key)) {
        client[key] = updates[key];
      }
    });

    return client;
  }
}
