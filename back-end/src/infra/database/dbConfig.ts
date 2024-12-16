import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST_SERVER,
  port: Number(process.env.POSTGRES_PORT),
  dialect: 'postgres',
});

export default sequelize;
