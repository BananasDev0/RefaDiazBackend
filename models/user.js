import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class User extends Sequelize.Model{};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }
)