import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Person from './person.js'; 

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'user',
        tableName: 'user',
        timestamps: true, //es para agregar created_at, update_at, checar con el equipo,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

User.belongsTo(Person, { foreignKey: 'person_id' }); 

export default User;
