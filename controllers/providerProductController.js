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

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id; 
        
        const providerProduct = await ProviderProduct.findAll({
            where: {
                productId: productId
            },
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

        if (!providerProduct) {
            return res.status(404).send("No se encontró un providerProduct para el producto especificado");
        }
        res.status(200).send(providerProduct);
    } catch (error) {
        console.error("Error al obtener el providerProduct:", error);
        res.status(500).send("Error al obtener el providerProduct");
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

const deleteProviderProduct = async (req, res) => {
    try {
        const providerProductId = req.params.id; // ID del providerProduct a eliminar
        
        // Buscar el providerProduct a eliminar
        const providerProductToDelete = await ProviderProduct.findByPk(providerProductId);

        // Verificar si el providerProduct existe
        if (!providerProductToDelete) {
            return res.status(404).send("El providerProduct especificado no existe");
        }

        // Eliminar el providerProduct
        await providerProductToDelete.destroy();

        res.status(200).send("ProviderProduct eliminado exitosamente");
    } catch (error) {
        console.error("Error al eliminar el providerProduct:", error);
        res.status(500).send("Error al eliminar el providerProduct");
    }
}

const updateProviderProduct = async (req, res) => {
    try {
        const providerProductId = req.params.id; // ID del providerProduct a actualizar
        const newData = req.body; // Nuevos datos para actualizar

        // Buscar el providerProduct a actualizar
        const providerProductToUpdate = await ProviderProduct.findByPk(providerProductId);

        // Verificar si el providerProduct existe
        if (!providerProductToUpdate) {
            return res.status(404).send("El providerProduct especificado no existe");
        }

        // Actualizar el providerProduct con los nuevos datos
        await providerProductToUpdate.update(newData);

        res.status(200).send(providerProductToUpdate);
    } catch (error) {
        console.error("Error al actualizar el providerProduct:", error);
        res.status(500).send("Error al actualizar el providerProduct");
    }
}

export { getAll, createProviderProduct, getProductById, deleteProviderProduct, updateProviderProduct };

