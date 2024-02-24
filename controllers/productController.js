import Product from '../models/product.js';

const getAll = async(req, res) => {
    try{
        const products = await Product.findAll();
        res.status(200).send(products);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getProduct = async(req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findOne({
            where: {
                id: productId
            }
        })
        
        if(!product) {
            res.status(500).send("Resource not found.");
        } else {
            res.status(200).send(product)
        }

    } catch(error) {
        res.status(500).send(error.message);
    }   
}

const createProduct = async(req, res) => {
    try{
        const productData = req.body;
        const product = await Product.create(productData);
        res.status(200).send(product.toJSON());
    }catch (error) {
        res.status(500).send(error.message);
    }
}

const updateProduct = async(req, res) => {
    try{
        const productId = req.params.id;
        const updatedData = req.body;
        const product = await Product.findByPk(productId);

        if(!product) {
            res.status(404).send("Resource not found.")
        } else {
            await product.update(updatedData);
            res.status(204).send(product);
        }

    } catch(error) {
        res.status(500).send(error.message);
    }
}

const deleteProduct = async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId)

        if(!product) {
            res.status(404).send('Resource not found.');
        } else {
            await product.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar brand: ', error);
        res.status(500).send(error);
    }
}

export { getAll, getProduct, createProduct, updateProduct, deleteProduct }