import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Person from './person.js'; 

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
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
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        hooks: {
            afterCreate: async (user, options) => {
                try {
                    await Person.create({ user_id: user.id });
                } catch (error) {
                    console.error("Error al crear la persona asociada al usuario:", error);
                }
            }
        }
    }
);

User.belongsTo(Person, { foreignKey: 'person_id' }); 

export default User;
