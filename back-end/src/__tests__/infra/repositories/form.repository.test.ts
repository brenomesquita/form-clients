import { Op } from 'sequelize';
import { Form } from '../../../domain/entities';
import FormModel from '../../../infra/database/schemas/Form';
import { FormRepository } from '../../../infra/repositories';

jest.mock('../../../infra/database/schemas/Form');
jest.mock('../../../domain/entities', () => {
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

describe('FormRepository', () => {
  let formRepository: FormRepository;

  beforeEach(() => {
    formRepository = new FormRepository();
  });

  it('should return a form when findOrCreate is called with an existing CPF or email', async () => {
    const formData = {
      id: 'some-id',
      name: 'John Doe',
      cpf: '12345678901',
      email: 'john.doe@example.com',
      colorId: 'some-uuid',
      observation: 'Test observation',
    };
    const form = Form.build(formData);

    const mockForm = {
      dataValues: {
        ...formData,
      },
    };

    FormModel.findOrCreate = jest.fn().mockResolvedValue([mockForm, false]);

    const result = await formRepository.findOrCreate(form);

    expect(result.dataValues).toHaveProperty('id');
    expect(result.dataValues.id).toBe('some-id');
    expect(FormModel.findOrCreate).toHaveBeenCalledWith({
      where: {
        [Op.or]: [{ cpf: formData.cpf }, { email: formData.email }],
      },
      defaults: {
        id: formData.id,
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        colorId: formData.colorId,
        observation: formData.observation,
      },
    });
  });

  it('should create a new form if CPF and email do not exist', async () => {
    const formData = {
      id: 'new-id',
      name: 'John Doe',
      cpf: '12345678901',
      email: 'john.doe@example.com',
      colorId: 'some-uuid',
      observation: 'Test observation',
    };
    const form = Form.build(formData);

    const mockForm = {
      dataValues: {
        ...formData,
      },
    };

    FormModel.findOrCreate = jest.fn().mockResolvedValue([mockForm, true]);

    const result = await formRepository.findOrCreate(form);

    expect(result.dataValues).toHaveProperty('id');
    expect(result.dataValues.id).toBe('new-id');
    expect(FormModel.findOrCreate).toHaveBeenCalledWith({
      where: {
        [Op.or]: [{ cpf: formData.cpf }, { email: formData.email }],
      },
      defaults: {
        id: formData.id,
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        colorId: formData.colorId,
        observation: formData.observation,
      },
    });
  });
});
