import { CreateFormDto } from '../../packages/form/use-cases/create/index';
import { decrypt } from '../../utils';

describe('[DTO] Form Validation', () => {
  describe('[CREATE] - Form test', () => {
    it('should validate successfully with valid data', () => {
      const validData = {
        name: 'John Doe',
        cpf: '11111111111',
        email: 'john.doe@example.com',
        colorId: '123e4567-e89b-12d3-a456-426614174000',
        observation: 'This is a valid observation.',
      };

      expect(() => CreateFormDto.validate(validData)).not.toThrow();
      const result = CreateFormDto.validate(validData);
      const cpfValue = decrypt(result.cpf);
      expect(cpfValue).toBe(validData.cpf);
    });

    it('should throw an error for invalid CPF', () => {
      const invalidData = {
        name: 'John Doe',
        cpf: '123.456.789-1',
        email: 'john.doe@example.com',
        colorId: '123e4567-e89b-12d3-a456-426614174000',
        observation: 'Valid observation.',
      };

      expect(() => CreateFormDto.validate(invalidData)).toThrow(/Invalid CPF/);
    });

    it('should throw an error for invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        cpf: '111.111.111-11',
        email: 'not-an-email',
        colorId: '123e4567-e89b-12d3-a456-426614174000',
        observation: 'Valid observation.',
      };

      expect(() => CreateFormDto.validate(invalidData)).toThrow(/must be a valid email/);
    });

    it('should throw an error for missing required fields', () => {
      const invalidData = {
        cpf: '111.111.111-11',
        email: 'john.doe@example.com',
      };

      expect(() => CreateFormDto.validate(invalidData)).toThrow(/"name" is required/);
      expect(() => CreateFormDto.validate(invalidData)).toThrow(/"colorId" is required/);
    });

    it('should throw an error if observation exceeds max length', () => {
      const invalidData = {
        name: 'John Doe',
        cpf: '111.111.111-11',
        email: 'john.doe@example.com',
        colorId: '123e4567-e89b-12d3-a456-426614174000',
        observation: 'a'.repeat(501),
      };

      expect(() => CreateFormDto.validate(invalidData)).toThrow(
        /must be less than or equal to 500 characters long/,
      );
    });
  });
});
