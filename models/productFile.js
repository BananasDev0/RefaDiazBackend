import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConnection.js';
import Product from './product.js';
import File from './file.js';

class ProductFile extends Model { }

ProductFile.init({
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: 'id'
        },
        field: 'product_id'
    },
    fileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: File,
            key: 'id'
        },
        field: 'file_id'
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'order_id'
    }
}, {
    sequelize,
    modelName: 'ProductFile',
    tableName: 'product_file',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Setup relationships
Product.hasMany(ProductFile, { foreignKey: 'productId', as: 'productFiles'});
ProductFile.belongsTo(Product, { foreignKey: 'productId' });

File.hasMany(ProductFile, { foreignKey: 'fileId' });
ProductFile.belongsTo(File, { foreignKey: 'fileId', as: 'file'});

export default ProductFile;
