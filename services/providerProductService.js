import Price from "../models/price.js";
import Provider from "../models/provider.js";
import ProviderProduct from "../models/providerProduct.js";

export class ProviderProductService {
    static async associateProviderToProduct(productId, providerProduct, transaction) {
        return await ProviderProduct.create({ productId, ...providerProduct }, { include: [{ model: Price, as: 'price' }], transaction });
    }

    static async getProviderProducts(productId) {
        return await ProviderProduct.findAll({
            where: {
                productId
            },
            include: [
                {
                    model: Price,
                    as: 'price'
                },
                {
                    model: Provider,
                    as: 'provider'
                }
            ]
        });
    }
}