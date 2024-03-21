//Esto es un ejemplo, cuando se tenga la bdd y 
//la conexion tenemos que usar sequelize para definir el modelo
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Price from "./price.js";
import Product from './product.js';

class ProductPrice extends Sequelize.Model{};

ProductPrice.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productId: {
            type: DataTypes.INTEGER
            
        },
        priceId: {
            type: DataTypes.INTEGER
            
        },

        active: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'productPrice', // El nombre del modelo en singular
        tableName: 'product_price', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

// Relación entre ProductPrice y Price
ProductPrice.belongsTo(Price, { as: 'price', foreignKey: 'priceId' });
Price.hasMany(ProductPrice, { as: 'productPrices', foreignKey: 'priceId' });

// Relación entre ProductPrice y Product
ProductPrice.belongsTo(Product, { as: 'product', foreignKey: 'productId' });
Product.hasMany(ProductPrice, { as: 'productPrices', foreignKey: 'productId' });




export default ProductPrice;