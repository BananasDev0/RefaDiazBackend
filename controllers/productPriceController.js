
import { where } from "sequelize";
import sequelize from "../config/dbConnection.js";
import Price from "../models/price.js";
import ProductPrice from "../models/productPrice.js";

const getAll = async (req, res) => {
    try {

        const productPrices = await ProductPrice.findAll({
            include: [{
                model: Price,
                as: 'price'
            }]
        });
        res.status(200).send(productPrices);
    } catch (error) {
        console.error('Error al recuperar los productprices:', error);
        res.status(500).send(error.message);
    }
};


const getProductPriceByProductAndPrice = async (req, res) => {
    try {
        const productId = req.params.productId;
        const priceId = req.params.priceId;
        const productPrice = await ProductPrice.findOne({
            where: {
                productId: productId,
                priceId: priceId
            },
            include: [{
                model: Price,
                as: 'price'
            }]
        })

        if (!productPrice) {
            res.status(404).send("Resource not found.");
        } else {
            res.status(200).send(productPrice)
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getProductPriceByProduct = async (req, res) => {
    try {
        const productId = req.params.productId;

        const productPrice = await ProductPrice.findAll({
            where: {
                productId: productId,
            },
            include: [{
                model: Price,
                as: 'price'
            }]
        })

        if (!productPrice) {
            res.status(404).send("Resource not found.");
        } else {
            res.status(200).send(productPrice)
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}







const createProductPrice = async (req, res) => {
    try {
        const productPriceData = req.body;
        ///const productPrice = await ProductPrice.create(productPriceData);
        const productPrice = await sequelize.transaction(async (t) => {
            const newPrice = await ProductPrice.create(productPriceData, {
                include: [{
                    model: Price,
                    as: 'price'
                }],
                transaction: t
            });
            return newPrice;
        });

        res.status(200).send(productPrice.toJSON());
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function bulkInsertProductPrices(req, res) {
    try {
        const productId = req.params.productId;
        const productPrices = req.body;
        productPrices.forEach(productPrice => {
            productPrice.productId = productId;
        }
        );

        const result = await ProductPrice.bulkCreate(productPrices, {
            include: [{
            model: Price,
            as: 'price'
            }]
        });
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear los precios de los productos' });
    }
}

const deleteProductPrice = async (req, res) => {
    try {
        const productId = req.params.productId;
        const priceId = req.params.priceId;
        const productPrice = await ProductPrice.findOne({
            where: {
                product_id: productId,
                price_id: priceId
            }
        })
        const price = await Price.findByPk(priceId)

        if (!productPrice) {
            res.status(404).send('Resource not found.');
        } else {
            await productPrice.destroy();
            await price.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar productPrice: ', error);
        res.status(500).send(error);
    }
}

//falta checar haber si jala
const updateProductPrice = async (req, res) => {
    const productId = req.params.productId;
    const priceId = req.params.priceId;
    const updatedPriceData = req.body.price; // Datos actualizados de price

    try {

        // Actualizar price
        const price = await Price.findByPk(priceId);

        if (!price) {
            return res.status(404).send("Price not found.");
        }

        await price.update(updatedPriceData);

        res.status(204).send();
    } catch (error) {
        console.error('Error updating product price:', error);
        res.status(500).send(error.message);
    }
};


export {
    getAll, getProductPriceByProductAndPrice,
    getProductPriceByProduct, createProductPrice,
    updateProductPrice, deleteProductPrice,
    bulkInsertProductPrices
}