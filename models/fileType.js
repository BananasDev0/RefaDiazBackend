import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.js';

class FileType extends Model {}

FileType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize, // pasa la instancia de sequelize
    modelName: 'FileType', // nombre del modelo
    tableName: 'file_type', // nombre de la tabla en la base de datos
    timestamps: false, // si true, Sequelize espera las columnas createdAt y updatedAt
    createdAt: 'created_at', // usa created_at en lugar de createdAt
    updatedAt: 'updated_at' // usa updated_at en lugar de updatedAt
});

export default FileType;
