import { Sequelize,DataTypes } from "sequelize";
import sequelize from "../config/dbConnection.js";

class Role extends Sequelize.Model{};

Role.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description:{
            type: DataTypes.STRING,
            field : 'description'
        },
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'role', // El nombre del modelo en singular
        tableName: 'role', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }

);
export default Role;