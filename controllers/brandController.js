import { createBrand } from "../services/brandService.js";

const createNewBrand = async(req, res) => {
    try {
        const brandData = req.body;
        await createBrand(brandData);
        res.status(200).send('Marca creada');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { createNewBrand };