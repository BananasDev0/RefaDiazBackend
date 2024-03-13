import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Person extends Sequelize.Model {}

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
        lastName: {
            type: DataTypes.STRING,
        },
        birthDate: {
            type: DataTypes.DATE
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
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