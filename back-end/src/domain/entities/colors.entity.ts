import { BaseEntity } from './base.entity';

export interface ColorsAttributes {
  id: string;
  name: string;
  value: string;
}

export class Colors extends BaseEntity<ColorsAttributes> implements ColorsAttributes {
  public id!: string;
  public name!: string;
  public value!: string;
}
