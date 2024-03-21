import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import VehicleModel from "./vehicle_model.js";

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
            allowNull: false,
            field: 'vehicle_model_id',
            references: {
                model: VehicleModel,
                key: 'id'
            }
        },
        version: {
            type: DataTypes.STRING
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

Vehicle.belongsTo(VehicleModel, { foreignKey: 'vehicle_model_id' });

export default Vehicle;
