import Product from "../models/product.js";

const getAll = async () => {
    let product = new Product();
    product.id = 2;
    product.name = 'radiador chido'
    return [product];
};

const createProduct = async(productData) => {
    try {
        const product = await Product.create(productData);
        console.log('Producto creado: ', product.toJSON());
        return product;
    } catch (error) {
        console.log('Error al crear un producto: ', error);
        throw error;
    }
}

export { getAll, createProduct };