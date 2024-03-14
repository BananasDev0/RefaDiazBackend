import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../config/dbConnection.js';
import BrandType from "./brandType.js";

class Brand extends Sequelize.Model{};

Brand.init(
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
        imageUrl: {
            type: DataTypes.STRING,
            field: 'image_url'
        },
        active: {
            type: DataTypes.INTEGER
        },
        brandTypeId : {
            type: DataTypes.INTEGER,
            field : 'brand_type_id',
            references : {
                Model: BrandType,
                key : 'id'
            }
        }
    },
    {
        sequelize: sequelize, // Aquí pasas tu instancia de Sequelize configurada
        modelName: 'brand', // El nombre del modelo en singular
        tableName: 'brand', // El nombre de la tabla en la base de datos
        timestamps: true, //es para agregar created_at, update_at, checar con el equipo,
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    }
);

Brand.belongsTo(BrandType, {as: 'brand_type',foreignKey : 'brand_type_id'});
BrandType.hasMany(Brand, {as: 'brand',foreignKey : 'brand_type_id'});

export default Brand;