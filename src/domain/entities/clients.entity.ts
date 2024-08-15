import { Manager } from './manager.entity';
import { Account } from './accounts/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public fullName: string;

  @Column()
  public adress: string;

  @Column()
  public phoneNumber: string;

  @Column()
  public monthlyIncome: number;

  @OneToMany(() => Account, account => account.clientId, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  public accounts?: Account[];

  @ManyToOne(() => Manager, manager => manager.clients, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'manager_id' })
  public manager?: Manager;

  constructor(
    fullName: string,
    adress: string,
    phoneNumber: string,
    monthlyIncome: number,
    manager?: Manager,
  ) {
    this.fullName = fullName;
    this.adress = adress;
    this.phoneNumber = phoneNumber;
    this.monthlyIncome = monthlyIncome;
    this.manager = manager;
  }
}
