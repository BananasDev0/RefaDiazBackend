//Esto es un ejemplo, cuando se tenga la bdd y 
//la conexion tenemos que usar sequelize para definir el modelo
import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/dbConnection";

class Product extends Sequelize.Model{};

Product.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING,
            field: 'product_name'
        },
        dpi: {
            type: DataTypes.STRING
        },
        brandId: {
            type: DataTypes.INTEGER,
            field: 'brand_id'
        },
        imageUrl: {
            type: DataTypes.STRING,
            field: 'image_url'
        }
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'product', // El nombre del modelo en singular
        tableName: 'product', // El nombre de la tabla en la base de datos
        //timestamps: false //es para agregar created_at, update_at, checar con el equipo
    }
);
export default Product;