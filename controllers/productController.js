import { getAll } from "../services/productService.js";

const getAllProducts = async (req, res) => {
    try {
        const productos = await getAll();
        res.json(productos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export { getAllProducts };
