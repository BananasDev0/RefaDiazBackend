//Esto es un ejemplo, cuando se tenga la bdd y 
//la conexion tenemos que usar sequelize para definir el modelo
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

import Product from './product.js';
import VehicleModel from './vehicleModel.js';

class ProductCarModel extends Sequelize.Model{};

ProductCarModel.init(
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
        modelName: 'ProductCarModel', // El nombre del modelo en singular
        tableName: 'product_car_model', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
        
    }
);

ProductCarModel.removeAttribute('id');

ProductCarModel.belongsTo(VehicleModel, { as: 'vehicleModel', foreignKey: 'vehicleModelId' });
VehicleModel.hasMany(ProductCarModel, { as: 'productCarModel', foreignKey: 'vehicleModelId' });


ProductCarModel.belongsTo(Product, { as: 'product', foreignKey: 'productId' });
Product.hasMany(ProductCarModel, { as: 'productCarModel', foreignKey: 'productId' });




export default ProductCarModel;