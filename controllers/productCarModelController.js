import Brand from "../models/brand.js";
import ProductCarModel from "../models/productCarModel.js"; // Cambiado de ProductVehicleModel a ProductCarModel
import CarModel from "../models/carModel.js"; // Asegurado que está cambiado a CarModel

const getAll = async (req, res) => {
    try {
        const productCarModels = await ProductCarModel.findAll(); // Cambiado a ProductCarModel
        res.status(200).send(productCarModels);
    } catch (error) {
        console.error('Error retrieving all productCarModels:', error);
        res.status(500).send(error.message);
    }
};

const getProductCarModel = async (req, res) => {
    try {
        const { productId, carModelId } = req.params; // Actualizado para usar carModelId
        const productCarModel = await ProductCarModel.findOne({ // Cambiado a ProductCarModel
            where: {
                productId,
                carModelId // Actualizado el nombre del campo
            }
        });
        if (!productCarModel) {
            return res.status(404).send('ProductCarModel not found.');
        }
        res.status(200).send(productCarModel);
    } catch (error) {
        console.error('Error retrieving specific productCarModel:', error);
        res.status(500).send(error.message);
    }
};

const getProductCarModels = async (req, res) => {
    try {
        const { productId } = req.params;
        const productCarModels = await ProductCarModel.findAll({ // Cambiado a ProductCarModel
            where: { productId },
            include: [{
                model: CarModel, // Asegurado que es CarModel
                as: 'carModel',
                include: [{
                    model: Brand,
                    as: 'brand'
                }]
            }]
        });
        res.status(200).send(productCarModels);
    } catch (error) {
        console.error('Error retrieving product car models:', error);
        res.status(500).send(error.message);
    }
};

const createProductCarModel = async (req, res) => {
    try {
        const productCarModelData = req.body;
        const productCarModel = await ProductCarModel.create(productCarModelData); // Cambiado a ProductCarModel
        res.status(201).send(productCarModel);
    } catch (error) {
        console.error('Error creating productCarModel:', error);
        res.status(500).send(error.message);
    }
};

const deleteProductCarModel = async (req, res) => {
    try {
        const { productId, carModelId } = req.params;
        const productCarModel = await ProductCarModel.findOne({ // Cambiado a ProductCarModel
            where: { productId, carModelId } // Actualizado
        });
        if (!productCarModel) {
            return res.status(404).send('ProductCarModel not found.');
        }
        await productCarModel.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting productCarModel:', error);
        res.status(500).send(error.message);
    }
};

const updateProductCarModel = async (req, res) => {
    try {
        const { productId, carModelId } = req.params;
        const updatedProductCarModelData = req.body; // Datos actualizados para productCarModel
        const productCarModel = await ProductCarModel.findOne({ // Cambiado a ProductCarModel
            where: { productId, carModelId }
        });
        if (!productCarModel) {
            return res.status(404).send("ProductCarModel not found.");
        }
        await productCarModel.update(updatedProductCarModelData);
        res.status(204).send();
    } catch (error) {
        console.error('Error updating productCarModel:', error);
        res.status(500).send(error.message);
    }
};

const createProductCarModelList = async (req, res) => {
    const productId = req.params.productId;
    const productCarModelDataList = req.body;

    try {
        const bulkData = productCarModelDataList.map(data => ({
            productId: productId,
            carModelId: data.carModelId, // Actualizado de vehicleModelId a carModelId
            initialYear: data.initialYear,
            lastYear: data.lastYear,
            active: data.active
        }));

        const createdModels = await ProductCarModel.bulkCreate(bulkData); // Actualizado de ProductVehicleModel a ProductCarModel

        res.status(200).json(createdModels);
    } catch (error) {
        console.error('Error creating product car models:', error);
        res.status(500).send(error.message);
    }
}


export {
    getAll,
    getProductCarModel,
    createProductCarModel,
    deleteProductCarModel,
    updateProductCarModel,
    getProductCarModels,
    createProductCarModelList
};
