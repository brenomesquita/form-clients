import { Form } from '../../domain/entities';
import { IFormRepository } from '../../domain/repositories';
import { UnprocessableContentException } from '../../exceptions';
import { CreateFormUseCase } from '../../packages/form/use-cases/create';

jest.mock('../../domain/entities', () => {
  return {
    Form: {
      build: jest.fn().mockImplementation((formData) => {
        return {
          ...formData,
        };
      }),
    },
  };
});

describe('[USE CASE] Test form', () => {
  describe('CreateFormUseCase', () => {
    let useCase: CreateFormUseCase;
    let mockRepository: jest.Mocked<IFormRepository>;

    beforeEach(() => {
      mockRepository = {
        findOrCreate: jest.fn(),
      };
      useCase = new CreateFormUseCase(mockRepository);
    });

    it('should create a new form and return the result', async () => {
      const formDto = {
        id: 'some-uuid',
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john.doe@example.com',
        colorId: 'some-uuid',
        observation: 'Test observation',
      };
      const form = Form.build(formDto);

      mockRepository.findOrCreate.mockResolvedValue(form);

      const result = await useCase.handle(form);

      expect(mockRepository.findOrCreate).toHaveBeenCalledWith(formDto);
      expect(result).toEqual({
        sent: true,
      });
    });

    it('should throw an UnprocessableContentException if repository fails', async () => {
      const formDto = {
        id: 'some-uuid',
        name: 'John Doe',
        cpf: '12345678901',
        email: 'john.doe@example.com',
        colorId: 'some-uuid',
        observation: 'Test observation',
      };
      const form = Form.build(formDto);

      const errorMessage = 'Database error';
      mockRepository.findOrCreate.mockRejectedValue(new Error(errorMessage));

      await expect(useCase.handle(form)).rejects.toThrow(UnprocessableContentException);
      await expect(useCase.handle(form)).rejects.toThrow(
        new UnprocessableContentException(errorMessage),
      );
    });
  });
});
