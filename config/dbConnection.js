import Sequelize from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    port: process.env.DATABSE_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, 
        rejectUnauthorized: false
      }
    },
  });

export default sequelize;