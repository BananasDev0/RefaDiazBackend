import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.js';

class File extends Model { }

File.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'mime_type'
    },
    storagePath: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'storage_path'
    }
}, {
    sequelize,
    modelName: 'File',
    tableName: 'file',
    timestamps: false,  // Asumiendo que no quieres columnas de timestamp
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default File;
