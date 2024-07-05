import { Injectable } from '@nestjs/common';
import { Manager } from 'src/models/manager.model';
import { CreateManagerDto } from './dto/create-manager.dto';
import { Client } from 'src/models/clients.model';

@Injectable()
export class ManagerService {
  private managers: Manager[] = [];

  createManager(createManagerDto: CreateManagerDto): Manager {
    const { fullName, clients } = createManagerDto;

    const newManager = new Manager(fullName, clients);

    console.log(newManager);

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

  addClient(id: string, client: Client) {
    const manager = this.getManagerById(id);
    if (!manager) {
      throw new Error('Manager not found');
    }

    console.log('service -> ', client);

    manager.addClients(client); // da erro aqui (o client retorna undefined)
  }
}
