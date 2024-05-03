import sequelize from "../config/dbConnection.js";
import Product from "../models/product.js";
import ProviderProduct from "../models/providerProduct.js";
import { FileConstants } from "../utils/fileConstants.js";
import { FileService } from "./fileService.js";
import { ProductCarModelService } from "./productCarModelService.js";
import { ProductPriceService } from "./productPriceService.js";
import { ProviderProductService } from "./providerProductService.js";

export class ProductService {
    static async getAllProducts(page = 1, limit = 10, productTypeId = null) {
        const options = {
            limit: limit,
            offset: (page - 1) * limit,
            where: {}
        };

        // Agregar filtro por productTypeId si se proporciona
        if (productTypeId) {
            options.where.productTypeId = productTypeId;
        }

        let products = await Product.findAll(options);
        let productIds = products.map(product => product.id);

        // Suponiendo que FileService.getFiles pueda manejar una lista vacía correctamente
        let files = productIds.length > 0 ? await FileService.getFiles(productIds, FileConstants.ProductImage) : [];

        // Convertir productos a JSON y anexar archivos correspondientes
        products = JSON.parse(JSON.stringify(products));
        products.forEach(product => {
            product.files = files.filter(file => file.objectId === product.id);
        });

        return {
            products: products,
            page: page,
            totalPages: Math.ceil(await Product.count(options.where) / limit),
            totalProducts: await Product.count(options.where)
        };
    }


    static async getProductById(productId) {
        let product = await Product.findOne({
            where: {
                id: productId
            }
        })

        if (!product) {
            return null;
        }

        let files = await FileService.getFiles([productId], FileConstants.ProductImage);
        product.setDataValue('files', files);

        let providers = await ProviderProductService.getProviderProducts(productId);
        product.setDataValue('providers', providers);

        let prices = await ProductPriceService.getProductPrices(productId);
        product.setDataValue('prices', prices);

        let carModels = await ProductCarModelService.getProductCarModels(productId);
        product.setDataValue('carModels', carModels);

        return product;
    }

    static async createProduct(productData) {
        const transaction = await sequelize.transaction();
        try {
            let product = await Product.create(productData, { transaction });

            // Crear relaciones con proveedores y manejar precios dentro de esa relación
            if (productData.providers) {
                let createdProviderProducts = [];
                for (let providerProductData of productData.providers) {
                    let createdProviderProduct = await ProviderProductService.associateProviderToProduct(product.id, providerProductData, transaction);
                    createdProviderProducts.push(createdProviderProduct);
                }
                product.setDataValue('providers', createdProviderProducts);
            }

            if (productData.prices && productData.prices.length > 0) {
                let createdPrices = [];
                for (let priceData of productData.prices) {
                    let createdPrice = await ProductPriceService.associatePriceToProduct(product.id, priceData, transaction);
                    createdPrices.push(createdPrice);
                }
                product.setDataValue('prices', createdPrices);
            }

            if (productData.carModels && productData.carModels.length > 0) {
                let createdProductCarModels = [];
                for (let productCarModel of productData.carModels) {
                    let createdProductCarModel = await ProductCarModelService.associateCarModelToProduct(product.id, productCarModel, transaction);
                    createdProductCarModels.push(createdProductCarModel);
                }
                product.setDataValue('carModels', createdProductCarModels);
            }

            // Procesar archivos relacionados con el producto
            if (productData.files && productData.files.length > 0) {
                let createdFiles = await FileService.createProductFiles(productData.files, product.id, { transaction });
                product.setDataValue('files', createdFiles);
            }

            await transaction.commit();
            return product;
        } catch (error) {
            await transaction.rollback();
            console.error('Error creating product:', error);
            throw error;
        }
    }

    static async updateProduct(productId, updatedData) {
        const transaction = await sequelize.transaction();
        try {
            let product = await Product.findByPk(productId);
            
            if (!product) {
                await transaction.rollback();
                return null;
            }
    
            // Update the basic fields of the product
            await product.update(updatedData, { transaction });
    
            // Update relationships with providers using the provided service
            if (updatedData.providers && updatedData.providers.length > 0) {
                await ProviderProductService.updateProviderProducts(productId, updatedData.providers, transaction);
                // ^ Aquí esperamos a que se complete la función dentro de la transacción
            }
    
            await transaction.commit();
            return product;
        } catch (error) {
            await transaction.rollback();
            console.error('Error updating product:', error);
            throw error;
        }
    }    
}