import Brand from "../models/brand.js";

const getAll = async (req, res) => {
    try {
        const brands = await Brand.findAll(); // Recupera todas las marcas de la base de datos
        res.send(brands); // Envía todas las marcas como respuesta
    } catch (error) {
        console.error('Error al recuperar las marcas:', error);
        res.status(500).send('Error interno del servidor');
    }
}

const createNewBrand = async(req, res) => {
    try {
        const brandData = req.body;
        const brand = await Brand.create(brandData);
        console.log('Producto creado: ', brand.toJSON());
        res.status(200).send('Marca creada');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { createNewBrand, getAll };