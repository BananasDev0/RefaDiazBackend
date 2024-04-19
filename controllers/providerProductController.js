import sequelize from "../config/dbConnection.js";
import Price from "../models/price.js";
import Product from "../models/product.js";
import ProviderProducts from '../models/providerProducts.js';

const getAll = async () => {
    
    const providerProducts = await ProviderProducts.findAll({
        include: [{
            model: Product,
            as: 'product'
        }]
    })
}