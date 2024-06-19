import CarModel from "../models/carModel.js";
import Product from "../models/product.js";
import ProductCarModel from "../models/productCarModel.js";
import { FileService } from "./fileService.js";
import { FileConstants } from "../utils/fileConstants.js";
import { Op } from "sequelize";
import sequelize from "../config/dbConnection.js";

export class ProductCarModelService {
    static async associateCarModelToProduct(productId, productCarModel, transaction) {
        return await ProductCarModel.create({ productId, ...productCarModel }, { transaction });
    }

    static async getProductCarModels(productId) {
        return await ProductCarModel.findAll({
            where: {
                productId
            },
            include: [
                {
                    model: CarModel,
                    as: 'carModel'
                }
            ]
        });
    }


    static async getProductsByCarModel(carModelId, productTypeId, searchTerm = '', page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const productWhere = {};

        // Incluir productTypeId en la consulta si es proporcionado
        if (productTypeId) {
            productWhere.productTypeId = productTypeId;
        }

        // Incluir searchTerm en la consulta si es proporcionado
        if (searchTerm) {
            productWhere[Op.or] = [
                {
                    name: {
                        [Op.iLike]: `%${searchTerm}%` // Uso de iLike para la búsqueda insensible a mayúsculas y minúsculas
                    }
                }
            ];
        }

        let productCarModels = await ProductCarModel.findAndCountAll({
            where: {
                carModelId
            },
            include: [
                {
                    model: Product,
                    as: 'product',
                    where: productWhere
                },
                {
                    model: CarModel,
                    as: 'carModel'
                }
            ],
            limit,
            offset
        });

        let ids = productCarModels.rows.map(pcm => pcm.productId);

        // Recuperar archivos asociados a los productos encontrados
        let files = await FileService.getFiles(ids, FileConstants.ProductImage);

        // Asignar archivos filtrados a sus respectivos productos
        productCarModels.rows.map(pcm => {
            let filteredFiles = files.filter(f => f.objectId === pcm.productId);
            if (pcm.product) {
                pcm.product.setDataValue('files', filteredFiles);
            }
        });

        return {
            data: productCarModels.rows,
            count: productCarModels.count,
            currentPage: page,
            totalPages: Math.ceil(productCarModels.count / limit)
        };
    }
    Z
    static async getAllProductCarModels(page = 1, limit = 10, productTypeId = null, searchTerm = '') {
        const offset = (page - 1) * limit;
        const productWhere = {};
    
        // Agregar filtro por productTypeId si se proporciona
        if (productTypeId) {
            productWhere.productTypeId = productTypeId;
        }
    
        // Agregar búsqueda por searchTerm si se proporciona
        if (searchTerm) {
            productWhere[Op.or] = [
                sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), {
                    [Op.like]: `%${searchTerm.toLowerCase()}%`
                })
            ];
        }
    
        let productCarModels = await ProductCarModel.findAndCountAll({
            include: [
                {
                    model: Product,
                    as: 'product',
                    where: productWhere
                },
                {
                    model: CarModel,
                    as: 'carModel'
                }
            ],
            limit,
            offset
        });
    
        // Filtrar productos duplicados
        const uniqueProductsMap = new Map();
        productCarModels.rows.forEach(pcm => {
            if (!uniqueProductsMap.has(pcm.product.id)) {
                uniqueProductsMap.set(pcm.product.id, pcm);
            }
        });
    
        const uniqueProductCarModels = Array.from(uniqueProductsMap.values());
    
        // Obtener los IDs únicos de los productos
        let ids = uniqueProductCarModels.map(pcm => pcm.productId);
        let files = await FileService.getFiles(ids, FileConstants.ProductImage);
    
        // Asociar archivos a los productos únicos
        uniqueProductCarModels.forEach(pcm => {
            let filteredFiles = files.filter(f => f.objectId === pcm.productId);
            if (pcm.product) {
                pcm.product.setDataValue('files', filteredFiles);
            }
        });
    
        // Ajustar el conteo total basado en productos únicos
        const totalCount = uniqueProductsMap.size;
    
        return {
            data: uniqueProductCarModels,
            count: totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        };
    }

    static async updateProductCarModel(productId, updatedData, transaction) {
        try {
            // Buscar todos los productos del proveedor asociados a este producto
            let productCarModels = await ProductCarModel.findAll({
                where: { productId },
                include: [{ model: CarModel, as: 'carModel' }],
                transaction
            });
    
            for (let productCarModel of productCarModels) {
                // Actualizar los campos del producto del proveedor
                const carModelUpdateData = updatedData.find(pcUpdated => pcUpdated.providerId === productCarModel.providerId);
                if (carModelUpdateData) {
                    await productCarModel.update(carModelUpdateData, { transaction });
    
                    if (productCarModel.carModel) {
                        await productCarModel.carModel.update(carModelUpdateData.carModel, { transaction });
                    }
                }
            }
    
            return productCarModels;
        } catch (error) {
            console.error('Error updating provider products:', error);
            throw error;
        }
    }
}