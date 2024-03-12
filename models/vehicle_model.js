import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Vehicle_model extends Sequelize.Model{};

Vehicle_model.init(
    {
        id: {
            type: DataTypes.INTEGER
        }
    }
)

export default Vehicle_model;