import { Form } from '../../../../domain/entities';
import { IFormRepository } from '../../../../domain/repositories';
import { UnprocessableContentException } from '../../../../exceptions';

export class CreateFormUseCase {
  private repository!: IFormRepository;
  constructor(repository: IFormRepository) {
    this.repository = repository;
  }

  async handle(form: Form) {
    try {
      await this.repository.findOrCreate(form);
      return {
        sent: true,
      };
    } catch (error: any) {
      throw new UnprocessableContentException(error.message || 'Unprocessable Entity');
    }
  }
}
