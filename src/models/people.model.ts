import { v4 as uuidv4 } from 'uuid';

export class People {
  public id: string;
  public fullName: string;

  constructor(fullName: string) {
    this.id = uuidv4();
    this.fullName = fullName;
  }

  public openAccount(): void {}

  public closeAccount(): void {}

  public changeAccountType(): void {}
}
