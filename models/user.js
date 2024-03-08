import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Person from './person.js'; // Import the Person model

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
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: false
    }
);

User.belongsTo(Person, { foreignKey: 'person_id' }); 

export default User;
