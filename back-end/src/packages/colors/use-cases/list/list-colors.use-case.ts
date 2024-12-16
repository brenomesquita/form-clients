import { Colors } from '../../../../domain/entities';
import { IColorsRepository } from '../../../../domain/repositories';
import { UnprocessableContentException } from '../../../../exceptions';
import NodeCache from 'node-cache';

export class ListColorsUseCase {
  private repository!: IColorsRepository;
  private cache!: NodeCache;
  constructor(repository: IColorsRepository) {
    this.repository = repository;
    this.cache = new NodeCache({ stdTTL: Infinity });
  }

  async handle(): Promise<Colors[] | null> {
    try {
      const cache = this.cache.get('Colors');
      if (cache) return cache as Colors[];
      const result = await this.repository.list();
      this.cache.set('Colors', result);
      return result;
    } catch (error: any) {
      throw new UnprocessableContentException(error.message || 'Unprocessable Entity');
    }
  }
}
