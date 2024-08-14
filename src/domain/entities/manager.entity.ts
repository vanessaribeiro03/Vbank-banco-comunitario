import { Client } from 'src/domain/entities/clients.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public fullName: string;

  @OneToMany(() => Client, client => client.manager, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  public clients?: Client[];

  constructor(fullName: string) {
    this.fullName = fullName;
  }
}
