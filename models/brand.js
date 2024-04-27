import { Model, DataTypes } from 'sequelize';
import BrandType from "./brandType.js";
import sequelize from '../config/dbConnection.js';
export class Brand extends Model {}

Brand.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    brandTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'brand_type_id',
        references: {
            model: 'brand_type', // Nombre de la tabla referenciada
            key: 'id' // Clave en la tabla referenciada
        }
    },
    active: {
        type: DataTypes.BOOLEAN
    }
}, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brand',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


Brand.belongsTo(BrandType, {
    as: 'brandType', // Alias para la relación
    foreignKey: 'brand_type_id' // Especifica el nombre de la clave foránea
});

export default Brand;