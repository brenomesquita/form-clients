import Joi from 'joi';
import { BadRequestException } from '../../../../exceptions/index';
import { encrypt } from '../../../../utils';

export class CreateFormDto {
  static validationSchema = Joi.object({
    name: Joi.string().min(3).max(200).required(),
    cpf: Joi.string()
      .custom((value, helper) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 11) {
          return helper.error('Invalid CPF');
        }
        return encrypt(cleaned);
      })
      .required(),
    email: Joi.string().email().required(),
    colorId: Joi.string().uuid().required(),
    observation: Joi.string().max(500).allow('').optional(),
  });

  static validate(input: Partial<CreateFormDto>) {
    const { error, value } = CreateFormDto.validationSchema.validate(input, { abortEarly: false });
    if (error) {
      throw new BadRequestException(
        `Validation failed: ${error.details.map((err) => err.message).join(', ')}`,
      );
    }
    return value;
  }
}
