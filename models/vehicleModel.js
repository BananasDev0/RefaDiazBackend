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
      allowNull: false,
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
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

VehicleModel.belongsTo(Brand, { foreignKey: 'id', as: 'brand' });
Brand.hasMany(VehicleModel, { foreignKey: 'brand_id', as: 'vehicleModel' });

export default VehicleModel;