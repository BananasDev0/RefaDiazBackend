import { where } from "sequelize";
import Price from "../models/price.js";
import ProductPrice from "../models/productPrice.js";

export class ProductPriceService {
    static async getProductPrices(productId) {
        return await ProductPrice.findAll({
            where: {
                productId
            },
            include: [
                {
                    model: Price,
                    as: 'price'
                }
            ]
        });
    }

    static async associatePriceToProduct(productId, productPrice, transaction) {
        return await ProductPrice.create({ productId, ...productPrice }, { include: [{ model: Price, as: 'price' }], transaction });
    }

    static async updateProductPrice(productId, updatedData, transaction) {
        try {
            // Buscar todos los precios de productos asociados a este producto
            let productPrices = await ProductPrice.findAll({
                where: { productId },
                include: [{ model: Price, as: 'price' }],
                transaction
            });
    
            for (let productPrice of productPrices) {
                // Actualizar los campos del precio del producto
                const priceUpdateData = updatedData.find(ppUpdated => ppUpdated.priceId === productPrice.priceId);
                if (priceUpdateData) {
                    await productPrice.update(priceUpdateData, { transaction });

                    if (priceUpdateData.price) {
                        await productPrice.price.update(priceUpdateData.price, { transaction });
                    }
                }
                
            }
    
            return productPrices;
        } catch (error) {
            console.error('Error updating product prices:', error);
            throw error;
        }
    }    
}