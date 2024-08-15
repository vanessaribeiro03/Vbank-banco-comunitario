import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManagerDto } from 'src/application/dtos/manager/create-manager.dto';
import { Manager } from 'src/domain/entities/manager.entity';
import { IManagerRepository } from 'src/domain/interfaces/manager.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ManagerRepository implements IManagerRepository {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async findAll(): Promise<Manager[]> {
    return await this.managerRepository.find();
  }

  async findById(id: string): Promise<Manager> {
    return await this.managerRepository.findOne({ where: { id } });
  }

  async save(manager: CreateManagerDto): Promise<Manager> {
    return await this.managerRepository.save(manager);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.managerRepository.delete(id);
    return result.affected > 0;
  }
}
