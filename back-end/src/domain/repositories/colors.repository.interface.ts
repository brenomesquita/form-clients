import { Colors } from '../entities';
import { IBaseRepository } from './base.repository.interface';

export interface IColorsRepository extends IBaseRepository<Colors> {
  list: () => Promise<Colors[] | null>;
}
