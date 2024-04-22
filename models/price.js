//Esto es un ejemplo, cuando se tenga la bdd y 
//la conexion tenemos que usar sequelize para definir el modelo
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import PriceType from "./priceType.js";

class Price extends Sequelize.Model{};

Price.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            
        },
        cost: {
            type: DataTypes.DOUBLE,
            field: 'cost'
        },
        description: {
            type: DataTypes.STRING,
            field:'description'
            
        },
        // Agregar el priceType Id es inecesario por que se mapea desde la bd 
       /* priceTypeId: {
            type: DataTypes.INTEGER,
            field:'price_type_id'
            
        },*/

        active: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'price', // El nombre del modelo en singular
        tableName: 'price', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

//Price.belongsTo(PriceType, { as: 'price_type', foreignKey: 'price_type_id' });
//PriceType.hasMany(Price, { as: 'price', foreignKey: 'price_type_id' });

export default Price;
