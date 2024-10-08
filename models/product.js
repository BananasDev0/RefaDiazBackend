import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Product extends Sequelize.Model { };

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        comments: {
            type: DataTypes.STRING,
            field: 'comments'
        },
        dpi: {
            type: DataTypes.STRING,
            field: 'dpi'
        },
        productTypeId: {
            type: DataTypes.INTEGER,
            field: 'product_type_id'
        },
        stockCount: {
            type: DataTypes.INTEGER,
            field: 'stock_count'
        },
        active: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'product',
        tableName: 'product',
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
export default Product;
