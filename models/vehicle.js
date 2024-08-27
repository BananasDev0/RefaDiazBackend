import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import CarModel from "./carModel.js";

class Vehicle extends Sequelize.Model {}

Vehicle.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        carModelId: {
            type: DataTypes.INTEGER,
            field: 'car_model_id',
            references: {
                model: CarModel,
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

Vehicle.belongsTo(CarModel, { foreignKey: 'carModelId', as: 'carModel' });
CarModel.hasMany(Vehicle, { foreignKey: 'carModelId', as: 'vehicle' });

export default Vehicle;
