import { BaseEntity } from './base.entity';

export interface FormAttributes {
  id: string;
  name: string;
  cpf: string;
  email: string;
  colorId: string;
  observation: string;
}

export class Form extends BaseEntity<FormAttributes> implements FormAttributes {
  public id!: string;
  public name!: string;
  public cpf!: string;
  public email!: string;
  public colorId!: string;
  public observation!: string;
}
