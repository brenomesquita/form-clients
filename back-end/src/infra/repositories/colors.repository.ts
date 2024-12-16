import { Colors } from '../../domain/entities';
import { IColorsRepository } from '../../domain/repositories';
import ColorsModel from '../database/schemas/Colors';
import { BaseRepository } from './base.repository';

export class ColorsRepository extends BaseRepository implements IColorsRepository {
  private entity;
  constructor() {
    super();
    this.entity = ColorsModel;
  }
  async list(): Promise<Colors[] | null> {
    const result: Colors[] = await this.entity.findAll({
      attributes: ['id', 'name', 'value'],
      raw: true,
    });
    return result;
  }
}
