
import ProductVehicleModel from "../models/productVehicleModel.js";

const getAll = async (req,res) => {
    try{

        const productVehicleModel = await ProductVehicleModel.findAll();
        res.status(200).send(productVehicleModel);

    }catch(error){
        console.error('Error al recuperar los productVehicleMode:', error);
        res.status(500).send(error.message);
    }

};

const getProductVehicleModel = async(req,res) => {
    try{

        const productId = req.params.productId;
        const vehicleModelId = req.params.vehicleModelId;

        const productVehicleModel = await ProductVehicleModel.findOne({
            where:{
                productId: productId,
                vehicleModelId: vehicleModelId
            }
        })
        res.status(200).send(productVehicleModel);

    }catch(error){
        res.status(500).send(error.message);
    }
}

const createProductVehicleModel = async(req,res) => {
    try{
        const productVehicleModelData = req.body;
        const productVehicleModel = await ProductVehicleModel.create(productVehicleModelData);

        res.status(200).send(productVehicleModel);


    }catch(error){
        res.status(500).send(error.message);
    }
}

const deleteProductVehicleModel = async (req, res) => {
    try {
        const productId = req.params.productId;
        const vehicleModelId = req.params.vehicleModelId;
        const productVehicleModel = await ProductVehicleModel.findOne({
            where:{
                productId: productId,
                vehicleModelId: vehicleModelId
            }
        })

        if (!productVehicleModel) {
            res.status(404).send('Resource not found.');
        } else {
            await productVehicleModel.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar productVehicleModel: ', error);
        res.status(500).send(error);
    }
}

const updateProductVehicleModel = async (req, res) => {
    const productId = req.params.productId;
    const vehicleModelId = req.params.vehicleModelId;

    const updatedProductVehicleModelData = req.body; // Datos actualizados de price

    try {

        const productVehicleModel = await ProductVehicleModel.findOne({
            where:{
                productId: productId,
                vehicleModelId: vehicleModelId
            }
        })

        if (!productVehicleModel) {
            return res.status(404).send("Price not found.");
        }

        await productVehicleModel.update(updatedProductVehicleModelData);

        res.status(204).send();
    } catch (error) {
        console.error('Error updating product productVehicleModel:', error);
        res.status(500).send(error.message);
    }
};



export {getAll,getProductVehicleModel,createProductVehicleModel,deleteProductVehicleModel,updateProductVehicleModel} 