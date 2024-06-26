import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import VehicleModel from "./vehicleModel.js";

class Vehicle extends Sequelize.Model {}

Vehicle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vehicleModelId: {
            type: DataTypes.INTEGER,
            field: 'vehicle_model_id',
            references: {
                model: VehicleModel,
                key: 'id'
            }
        },
        version: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.INTEGER
        }
    },
    {
        sequelize,
        modelName: 'Vehicle',
        tableName: 'vehicle',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

Vehicle.belongsTo(VehicleModel, { foreignKey: 'vehicleModelId', as: 'vehicleModel' });
VehicleModel.hasMany(Vehicle, { foreignKey: 'vehicleModelId', as: 'vehicle' });

export default Vehicle;
