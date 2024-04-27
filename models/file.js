import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.js';
import FileType from "./fileType.js";

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
    },
    objectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'object_id'
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'order_id'
    },
    fileTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'file_type_id',
        references: {
            model: 'file_type',
            key: 'id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize,
    modelName: 'File',
    tableName: 'file',
    timestamps: false,  // Asumiendo que no quieres columnas de timestamp
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

File.belongsTo(FileType, {
    as: 'fileType',
    foreignKey: 'file_type_id'
});

export default File;