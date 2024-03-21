import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Brand from './brand.js';

class VehicleModel extends Sequelize.Model {};

VehicleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        brandId: {
            type: DataTypes.INTEGER,
            field: 'brand_id',
            references: {
                model: Brand,
                key: 'id'
            }
        },
        active: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'VehicleModel',
        tableName: 'vehicle_model',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

VehicleModel.hasOne(Brand, { as: 'brand', foreignKey: 'brandId' });

export default VehicleModel;
