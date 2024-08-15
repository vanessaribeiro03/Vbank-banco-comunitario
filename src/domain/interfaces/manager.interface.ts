import { CreateManagerDto } from 'src/application/dtos/manager/create-manager.dto';
import { Manager } from '../entities/manager.entity';

export interface IManagerRepository {
  findAll(): Promise<Manager[]>;
  findById(id: string): Promise<Manager>;
  save(manager: CreateManagerDto): Promise<Manager>;
  delete(id: string): Promise<boolean>;
}
