import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Person from './person.js';
import Role from './role.js';

class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        person_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Person,
                key: 'id'
            }
        },
        role_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
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

User.belongsTo(Role, {as:'role', foreignKey:'role_id'});
Role.hasOne(User, { as: 'user', foreignKey: 'role_id' });

export default User;
