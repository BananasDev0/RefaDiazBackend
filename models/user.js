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
        personId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Person,
                key: 'id'
            },
            field: 'person_id'
        },
        roleId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Role,
                key: 'id'
            },
            field: 'role_id'
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

User.belongsTo(Person, { as: 'person', foreignKey: 'personId' });
Person.hasOne(User, { as: 'user', foreignKey: 'personId' });

User.belongsTo(Role, {as:'role', foreignKey:'roleId'});
Role.hasOne(User, { as: 'user', foreignKey: 'roleId' });

export default User;
