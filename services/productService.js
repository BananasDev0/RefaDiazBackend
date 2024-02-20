import Product from "../models/product.js";

const getAll = async () => {
    let product = new Product();
    product.id = 2;
    product.name = 'radiador chido'
    return [product];
};

export { getAll };