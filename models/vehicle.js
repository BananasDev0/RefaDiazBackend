import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Vehicle extends Sequelize.Model {}

Person.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        birth_date: {
            type: DataTypes.DATE
        },
        email: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'Person',
        tableName: 'person',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

export default Person;
