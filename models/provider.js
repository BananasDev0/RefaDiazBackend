//Esto es un ejemplo, cuando se tenga la bdd y 
//la conexion tenemos que usar sequelize para definir el modelo
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Provider extends Sequelize.Model{};

Provider.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            

        },
        name: {
            type: DataTypes.STRING,
            field : 'name'
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            field : 'phone_number'
        },
        address: {
            type: DataTypes.STRING,
            field : 'address'
        },
        comments: {
            type: DataTypes.STRING,
            field : 'comments'
        },
        active: {
            type: DataTypes.INTEGER
        },
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'provider', // El nombre del modelo en singular
        tableName: 'provider', // El nombre de la tabla en la base de datos
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);
export default Provider;