import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Person from './person.js'; // Importa el modelo Person

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Person,
                key: 'id'
            }
        },
        active: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

User.belongsTo(Person, { as: 'person', foreignKey: 'person_id' });
Person.hasOne(User, { as: 'user', foreignKey: 'person_id' });

export default User;
