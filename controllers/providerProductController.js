import sequelize from "../config/dbConnection.js";
import Price from "../models/price.js";
import Product from "../models/product.js";
import Provider from "../models/provider.js";
import ProviderProduct from '../models/providerProducts.js';

const getAll = async (req, res) => {
    try {
        const providerProducts = await ProviderProduct.findAll({
            include: [
                {
                    model: Product,
                    as: 'product'
                },
                {
                    model: Price,
                    as: 'price'
                }
            ]
        });
        res.status(200).send(providerProducts);
    } catch (error) {
        res.status(404).send(error.message);
    }
}

const createProviderProduct = async (req, res) => {
    try {
        const { productId, providerId, priceId, ...providerProductData } = req.body;

        // Verificar si el producto existe en la base de datos
        const existingProduct = await Product.findByPk(productId);
        if (!existingProduct) {
            return res.status(400).send("El producto especificado no existe");
        }
        // Verificar si el proveedor existe en la base de datos
        const existingProvider = await Provider.findByPk(providerId);
        if (!existingProvider) {
            return res.status(400).send("El proveedor especificado no existe");
        }

        // Crear un nuevo ProviderProduct con el producto y el proveedor existentes, y el nuevo precio
        const providerProduct = await sequelize.transaction(async (t) => {
            const newProviderProduct = await ProviderProduct.create({
                productId: productId,
                providerId: providerId,
                priceId: priceId,
                ...providerProductData
            }, {
                include: [{
                    model: Price,
                    as: 'price'
                }],
                transaction: t
            });
            return newProviderProduct;
        });

        res.status(200).send(providerProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { getAll, createProviderProduct};
