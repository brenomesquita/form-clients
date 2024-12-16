import { Form } from '../entities';
import { IBaseRepository } from './base.repository.interface';

export interface IFormRepository extends IBaseRepository<Form> {
  findOrCreate: (entity: Form) => Promise<Form>;
}
