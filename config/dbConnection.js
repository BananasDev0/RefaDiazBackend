import Sequelize from "sequelize";
import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
});


const sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: false, 
        rejectUnauthorized: false
      }
    },
  });

export default sequelize;
