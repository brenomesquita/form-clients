import { Model } from 'sequelize';

export class BaseEntity<T extends { [key: string]: any }> extends Model<T> {
  public id!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}
