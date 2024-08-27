import sequelize from "../config/dbConnection.js";
import Product from "../models/product.js";
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

            await product.update(updatedData, { transaction });

            await this._deleteExcludedResources(productId, updatedData, transaction);
    
            await this._updateCreateNestedResources(productId, updatedData, transaction);
    
            await transaction.commit();
            return 200;

        } catch (error) {
            await transaction.rollback();
            console.error('Error updating product:', error);
            throw error;
        }
    }
    
    static async _deleteExcludedResources(productId, productData, transaction) {
        try {
            let excludedCarModels = await ProductCarModelService.getExcludedCarModels(productId, productData.carModels.map(cm => cm.carModelId));
            let excludedCarModelsIds = excludedCarModels.map(em => em.carModelId);
            if (excludedCarModels && excludedCarModels.length > 0) {
                await ProductCarModelService.deleteBulkProductCarModels(productId, excludedCarModelsIds, transaction);
            }

            let excludedPrices = await ProductPriceService.getExcludedPrices(productId, productData.prices.map(p => p.priceId));
            let excludedPricesIds = excludedPrices.map(ep => ep.priceId);
            if (excludedPrices && excludedPrices.length > 0) {
                await ProductPriceService.deleteBulkProductPrices(productId, excludedPricesIds, transaction);
            }

            let excludedFiles = await FileService.getExcludedFiles(productId, FileConstants.ProductImage ,productData.files.map(f => f.id));
            if (excludedFiles && excludedFiles.length > 0) {
                await FileService.deleteBulkFiles(productId, FileConstants.ProductImage ,excludedFiles, transaction);
            }

            let excludedProviderProducts = await ProviderProductService.getExcludedProviderProducts(productId, productData.providers.map(pp => pp.providerId));
            let excludedProviderProductsIds = excludedProviderProducts.map(epp => epp.providerId);
            if (excludedProviderProducts && excludedProviderProducts.length > 0) {
                await ProviderProductService.deleteBulkProviderProducts(productId, excludedProviderProductsIds, transaction);
            }
        } catch (error) {
            console.error('Error deleting excluded resources:', error);
            throw error;
        }
    }

    static async _updateCreateNestedResources(productId, updatedData, transaction) {
        try {
            if (updatedData.carModels && updatedData.carModels.length > 0) {
                let updateProductCarModels = updatedData.carModels.filter(cm => cm.productId);
                await ProductCarModelService.updateBulkProductCarModels(productId, updateProductCarModels, transaction);

                let createProductCarModels = updatedData.carModels.filter(cm => !cm.productId);
                for (let productCarModel of createProductCarModels) {
                    await ProductCarModelService.associateCarModelToProduct(productId, productCarModel, transaction);
                }
            }

            if (updatedData.prices && updatedData.prices.length > 0) {
                let updateProductPrices = updatedData.prices.filter(p => p.productId);
                await ProductPriceService.updateBulkProductPrices(productId, updateProductPrices, transaction);

                let createProductPrices = updatedData.prices.filter(p => !p.productId);
                for (let productPrice of createProductPrices) {
                    await ProductPriceService.associatePriceToProduct(productId, productPrice, transaction);
                }
            }

            if (updatedData.files && updatedData.files.length > 0) {
                let updateFiles = updatedData.files.filter(f => f.id);
                for (let file of updateFiles) {
                    await FileService.updateFile(file.id, file, transaction);
                }

                let createFiles = updatedData.files.filter(f => !f.id);
                for (let file of createFiles) {
                    await FileService.createFile({ ...file, objectId: productId }, transaction);
                }
            }

            if (updatedData.providers && updatedData.providers.length > 0) {
                let updateProviderProducts = updatedData.providers.filter(pp => pp.productId);
                await ProviderProductService.updateBulkProviderProducts(productId, updateProviderProducts, transaction);

                let createProviderProducts = updatedData.providers.filter(pp => !pp.productId);
                for (let providerProduct of createProviderProducts) {
                    await ProviderProductService.associateProviderToProduct(productId, providerProduct, transaction);
                }
            }
        } catch (error) {
            console.error('Error updating nested resources:', error);
            throw error;
        }
    }
}