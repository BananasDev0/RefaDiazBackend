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

        let ids = productCarModels.rows.map(pcm => pcm.productId);
        let files = await FileService.getFiles(ids, FileConstants.ProductImage);

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


}