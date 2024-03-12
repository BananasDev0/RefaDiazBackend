import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import VehicleModel from './vehicleModel.js';

class Vehicle extends Sequelize.Model {}
Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    vehicleModelId: {
      type: DataTypes.INTEGER
    },
    version: {
      type: DataTypes.STRING
    },
    year: {
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

Vehicle.belongsTo(VehicleModel, { foreignKey: 'vehicleModelId' });
VehicleModel.hasMany(Vehicle, { foreignKey: 'vehicleModelId' });

export default Vehicle;
