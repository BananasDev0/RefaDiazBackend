import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';

class Brand extends Sequelize.Model{};

Brand.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brandName: {
            type: DataTypes.STRING,
            field: 'brand_name'
        }
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'brand', // El nombre del modelo en singular
        tableName: 'brand', // El nombre de la tabla en la base de datos
        timestamps: false //es para agregar created_at, update_at, checar con el equipo
    }
);
export default Brand;