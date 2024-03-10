import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import Product from './product.js';

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

        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'radiator', // El nombre del modelo en singular
        tableName: 'radiator', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'

    }
)

Radiator.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });
Product.hasOne(Radiator, { as: 'radiator', foreignKey: 'product_id' });


export default Radiator;