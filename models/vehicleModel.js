import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Brand from './brand.js'; // Importa el modelo de Brand

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
    brand_id: {
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

VehicleModel.belongsTo(Brand, { foreignKey: 'brand_id' }); 
Brand.hasMany(VehicleModel, { foreignKey: 'brand_id' }); 

export default VehicleModel;
