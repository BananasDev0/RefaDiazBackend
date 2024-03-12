import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Brand from "./brand.js";
import Vehicle from "./vehicle.js";

class VehicleModel extends Sequelize.Model {}

VehicleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Brand,
                key: 'id'
            }
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


VehicleModel.hasMany(Vehicle, { as: 'vehicles', foreignKey: 'vehicle_model_id' });

export default VehicleModel;
