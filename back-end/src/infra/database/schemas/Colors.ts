import { STRING, UUID, UUIDV4 } from 'sequelize';
import sequelize from '../dbConfig';
import { Colors } from '../../../domain/entities';

const ColorModel = sequelize.define<Colors>('Colors', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  value: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
});

export default ColorModel;
