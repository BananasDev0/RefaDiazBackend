import { createBrand } from "../services/brandService";

const createNewBrand = async(req, res) => {
    try {
        await createBrand({
            brandName: 'FORD',
            active: 1
          });
        res.status(200).send('Marca creada');
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export { createNewBrand };