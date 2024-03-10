import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Radiator extends Sequelize.Model{};

Radiator.init(
    {
        id:{
            type : DataTypes.INTEGER,
            autoIncremet: true,
            primaryKey: true
        },
        dpi:{
            type: DataTypes.STRING
        },
        productId:{
            type: DataTypes.INTEGER,
            field: 'product_id'
        },
        active : {
            type: DataTypes.INTEGER
        },

    }
)

export default Radiator;