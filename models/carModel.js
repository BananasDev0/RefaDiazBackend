import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Brand from './brand.js';

class CarModel extends Sequelize.Model {}

CarModel.init(
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
    modelName: 'CarModel',
    tableName: 'car_model', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

CarModel.belongsTo(Brand, { foreignKey: 'id', as: 'brand' });
Brand.hasMany(CarModel, { foreignKey: 'brand_id', as: 'carModel' });

export default CarModel;