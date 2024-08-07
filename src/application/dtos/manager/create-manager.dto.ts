import { Client } from 'src/domain/entities/clients.entity';

export class CreateManagerDto {
  fullName: string;
  clients?: Client[];
}
