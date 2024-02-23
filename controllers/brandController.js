import Brand from "../models/brand.js";

const getAll = async (req, res) => {
    try {
        const brands = await Brand.findAll(); // Recupera todas las marcas de la base de datos
        res.status(200).send(brands); // Envía todas las marcas como respuesta
    } catch (error) {
        console.error('Error al recuperar las marcas:', error);
        res.status(500).send('Error interno del servidor');
    }
}
const getBrand = async(req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await Brand.findOne({ 
            where: { 
                id: brandId 
            } 
        });
       
        if(!brand) {
            res.status(404).send('No existe esa Brand');
            console.log("no existe");
        } else {
            res.status(200).send(brand);    
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const createNewBrand = async(req, res) => {
    try {
        const brandData = req.body;
        const brand = await Brand.create(brandData);
        res.status(200).send(brand.toJSON());
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateBrand = async(req, res) => {
    try {
        const brandId = req.params.id;
        const updatedData = req.body;

        const brand = Brand.findByPk(brandId);

        if(!brand) {
            res.status(404).send("No existe tal brand");
        } else {
            await brand.update(updatedData);
            res.status(200).send(brand);
        }

    } catch (error) {
        console.error('Error al actualizar la marca:', error);
        res.status(500).send('Error interno del servidor');
    }
}


const deleteBrand = async(req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await Brand.findByPk(brandId)

        if(!brand) {
            res.status(404).send('brand not found');
        } else {
            await brand.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar brand: ', error);
        res.status(500).send(error);
    }
}

export { createNewBrand, getAll, deleteBrand, getBrand, updateBrand };