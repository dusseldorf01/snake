import { Sequelize } from 'sequelize-typescript';

const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';
const POSTGRES_PORT = process.env.POSTGRES_PORT || 5432;
const POSTGRES_NAME = process.env.POSTGRES_NAME || 'postgres';

const sequelize = new Sequelize({
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_NAME,
  dialect: 'postgres',
});

export default sequelize;
