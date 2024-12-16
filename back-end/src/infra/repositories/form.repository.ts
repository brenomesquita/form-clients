import { Op } from 'sequelize';
import { Form } from '../../domain/entities';
import { IFormRepository } from '../../domain/repositories';
import FormModel from '../database/schemas/Form';
import { BaseRepository } from './base.repository';

export class FormRepository extends BaseRepository implements IFormRepository {
  private entity;
  constructor() {
    super();
    this.entity = FormModel;
  }

  async findOrCreate(Form: Form): Promise<Form> {
    const [result] = await this.entity.findOrCreate({
      where: {
        [Op.or]: [{ cpf: Form.cpf }, { email: Form.email }],
      },
      defaults: {
        id: Form.id,
        name: Form.name,
        cpf: Form.cpf,
        email: Form.email,
        colorId: Form.colorId,
        observation: Form.observation,
      },
    });
    return result;
  }
}
