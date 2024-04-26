//Esto es un ejemplo, cuando se tenga la bdd y 
//la conexion tenemos que usar sequelize para definir el modelo
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

import Product from './product.js';
import VehicleModel from './vehicleModel.js';

class ProductVehicleModel extends Sequelize.Model{};

ProductVehicleModel.init(
    {
        
        productId: {
            type: DataTypes.INTEGER,
            field :  'product_id',
            primaryKey: true,
            
        },
        vehicleModelId: {
            type: DataTypes.INTEGER,
            field: 'vehicle_model_id',
            primaryKey: true,
        },
        initialYear: {
            type: DataTypes.INTEGER,
            field: 'initial_year'
        },
        lastYear: {
            type: DataTypes.INTEGER,
            field :'last_year'
        },
        active: {
            type: DataTypes.INTEGER,
            field: 'active'
        },
    },
    {
        
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'productVehicleModel', // El nombre del modelo en singular
        tableName: 'product_vehicle_model', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        
    }
);

ProductVehicleModel.removeAttribute('id');

ProductVehicleModel.belongsTo(VehicleModel, { as: 'vehicleModel', foreignKey: 'vehicleModelId' });
VehicleModel.hasMany(ProductVehicleModel, { as: 'productVehicleModel', foreignKey: 'vehicleModelId' });


ProductVehicleModel.belongsTo(Product, { as: 'product', foreignKey: 'productId' });
Product.hasMany(ProductVehicleModel, { as: 'productVehicleModel', foreignKey: 'productId' });




export default ProductVehicleModel;