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
}