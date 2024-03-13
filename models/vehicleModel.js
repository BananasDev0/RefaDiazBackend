import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Brand from './brand.js';

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
      allowNull: false
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    active: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'VehicleModel',
    tableName: 'vehicle_models', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

VehicleModel.belongsTo(Brand, { foreignKey: 'brand_id', as: 'brand' });
Brand.hasMany(VehicleModel, { foreignKey: 'brand_id', as: 'vehicleModels' });

export default VehicleModel;
