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
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
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
        timestamps: true, //es para agregar created_at, update_at, checar con el equipo,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

export default Person;
