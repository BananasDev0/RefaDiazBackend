//Esto es un ejemplo, cuando se tenga la bdd y 
//la conexion tenemos que usar sequelize para definir el modelo
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Price from "./price.js";
import Provider from './provider.js'
import Product from './product.js';

class ProviderProduct extends Sequelize.Model{};

ProviderProduct.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            field : 'product_id'
        },
        priceId: {
            type: DataTypes.INTEGER,
            field: 'price_id'
            
        },
        providerId: {
            type: DataTypes.INTEGER,
            field : 'provider_id'
            
        },
        numSeries: {
            type: DataTypes.STRING,
            field : 'num_series'
            
        },
        active: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'providerProduct', // El nombre del modelo en singular
        tableName: 'provider_product', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

ProviderProduct.removeAttribute('id');

// Relación entre ProviderProduct y Price
ProviderProduct.belongsTo(Price, { as: 'price', foreignKey: 'provider_product_id' });
Provider.hasMany(ProviderProduct, { as: 'provider_product', foreignKey: 'provider_product_id' });

// Relación entre ProviderProduct y Product
ProviderProduct.belongsTo(Product, { as: 'product', foreignKey: 'provider_product_id' });
Product.hasMany(ProviderProduct, { as: 'provider_product', foreignKey: 'provider_product_id' });

// Relación entre ProviderProduct y Provider
ProviderProduct.belongsTo(Provider, { as: 'provider', foreignKey: 'provider_product_id' });
Provider.hasMany(ProviderProduct, { as: 'provider_product', foreignKey: 'provider_product_id' });


export default ProductPrice;