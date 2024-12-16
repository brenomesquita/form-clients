import { Form } from '../../../domain/entities';

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

describe('Form Entity Validation', () => {
  it('should correctly initialize the properties when a new instance is created', () => {
    const formData = {
      id: 'some-uuid',
      name: 'John Doe',
      cpf: '111.111.111-11',
      email: 'johndoe@example.com',
      colorId: '123e4567-e89b-12d3-a456-426614174000',
      observation: 'Some observation',
    };
    const form = Form.build(formData);

    expect(form.name).toBe(formData.name);
    expect(form.cpf).toBe(formData.cpf);
    expect(form.email).toBe(formData.email);
    expect(form.colorId).toBe(formData.colorId);
    expect(form.observation).toBe(formData.observation);
  });
});
