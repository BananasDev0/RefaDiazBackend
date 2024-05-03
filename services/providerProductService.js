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

    static async updateProviderProducts(productId, updatedData, transaction) {
        try {
            // Buscar todos los productos del proveedor asociados a este producto
            let productProviders = await ProviderProduct.findAll({
                where: { productId },
                include: [{ model: Price, as: 'price' }],
                transaction
            });
    
            for (let productProvider of productProviders) {
                // Actualizar los campos del producto del proveedor
                const providerUpdateData = updatedData.find(ppUpdated => ppUpdated.providerId === productProvider.providerId);
                if (providerUpdateData) {
                    await productProvider.update(providerUpdateData, { transaction });
    
                    if (providerUpdateData.price) {
                        await productProvider.price.update(providerUpdateData.price, { transaction });
                    }
                }
            }
    
            return productProviders;
        } catch (error) {
            console.error('Error updating provider products:', error);
            throw error;
        }
    }
    
}