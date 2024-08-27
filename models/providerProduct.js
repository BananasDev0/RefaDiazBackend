import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Price from "./price.js";
import Provider from './provider.js';
import Product from './product.js';

class ProviderProduct extends Sequelize.Model {};

ProviderProduct.init({
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'product',
            key: 'id'
        },
        field: 'product_id',
        primaryKey: true
    },
    priceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'price',
            key: 'id'
        },
        field: 'price_id',
        primaryKey: true
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'provider',
            key: 'id'
        },
        field: 'provider_id',
        primaryKey: true
    },
    numSeries: {
        type: DataTypes.STRING,
        field: 'num_series'
    },
    active: {
        type: DataTypes.INTEGER
    },
}, {
    sequelize,
    modelName: 'ProviderProduct',
    tableName: 'provider_product',
    timestamps: false
});

ProviderProduct.removeAttribute('id');

// Relaciones correctas

// Relación entre ProviderProduct y Price
ProviderProduct.belongsTo(Price, {
    as: 'price',
    foreignKey: 'priceId'
});

// Relación entre ProviderProduct y Product
ProviderProduct.belongsTo(Product, {
    as: 'product',
    foreignKey: 'productId'
});
Product.hasMany(ProviderProduct, {
    as: 'providerProducts',
    foreignKey: 'productId'
});

// Relación entre ProviderProduct y Provider
ProviderProduct.belongsTo(Provider, {
    as: 'provider',
    foreignKey: 'providerId'
});
Provider.hasMany(ProviderProduct, {
    as: 'providerProducts',
    foreignKey: 'providerId'
});

export default ProviderProduct;
