import { Client } from 'src/domain/entities/clients.model';

export class CreateManagerDto {
  fullName: string;
  clients?: Client[];
}
