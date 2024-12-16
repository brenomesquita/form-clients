import { INTEGER, STRING, UUID, UUIDV4 } from 'sequelize';
import sequelize from '../dbConfig';
import { Form } from '../../../domain/entities';

const FormModel = sequelize.define<Form>('Forms', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: INTEGER,
    allowNull: false,
    validate: {
      len: [3, 200],
    },
  },
  cpf: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  observation: {
    type: STRING,
    allowNull: false,
  },
  colorId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: 'Colors',
      key: 'id',
    },
  },
});

export default FormModel;
