import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Price from "./price.js";
import Provider from './provider.js';
import Product from './product.js';

class ProviderProduct extends Sequelize.Model {}

ProviderProduct.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            field: 'product_id'
        },
        priceId: {
            type: DataTypes.INTEGER,
            field: 'price_id'
        },
        providerId: {
            type: DataTypes.INTEGER,
            field: 'provider_id'
        },
        numSeries: {
            type: DataTypes.STRING,
            field: 'num_series'
        },
        active: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize: sequelize,
        modelName: 'ProviderProduct',
        tableName: 'provider_product',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

// Relación entre ProviderProduct y Price
ProviderProduct.belongsTo(Price, { as: 'price', foreignKey: 'priceId' });
Price.hasMany(ProviderProduct, { as: 'providerProducts', foreignKey: 'priceId' });

// Relación entre ProviderProduct y Product
ProviderProduct.belongsTo(Product, { as: 'product', foreignKey: 'productId' });
Product.hasMany(ProviderProduct, { as: 'providerProducts', foreignKey: 'productId' });

// Relación entre ProviderProduct y Provider
ProviderProduct.belongsTo(Provider, { as: 'provider', foreignKey: 'providerId' });
Provider.hasMany(ProviderProduct, { as: 'providerProducts', foreignKey: 'providerId' });

export default ProviderProduct;
