import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Product extends Sequelize.Model{};

Product.init(
    {
        id:{
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
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 1
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
