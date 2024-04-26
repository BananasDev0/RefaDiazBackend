import sequelize from "../config/dbConnection.js";
import Brand from "../models/brand.js";
import ProductVehicleModel from "../models/productVehicleModel.js";
import VehicleModel from "../models/vehicleModel.js";

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

const getProductVehicleModels = async (req, res) => {
    try {
        const productId = req.params.productId;
        const productVehicleModels = await ProductVehicleModel.findAll({
            where: {
                productId: productId
            },
            include: [
                {
                    model: VehicleModel,
                    as: 'vehicleModel',
                    include: [
                        {
                            model: Brand,
                            as: 'brand'
                        }
                    ]
                }
            ]
        });
        res.status(200).send(productVehicleModels);
    } catch (error) {
        console.error('Error retrieving product vehicle models:', error);
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
                product_id: productId,
                vehicle_model_id: vehicleModelId
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
                product_id: productId,
                vehicle_model_id: vehicleModelId
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


const createProductVehicleModelList = async (req, res) => {
    const productId = req.params.productId;
    const productVehicleModelDataList = req.body;

    try {

        const bulkData = productVehicleModelDataList.map(data => ({
            productId: productId,
            vehicleModelId: data.vehicleModelId,
            initialYear: data.initialYear,
            lastYear: data.lastYear,
            active: data.active
        }));


        const createdModels = await ProductVehicleModel.bulkCreate(bulkData);

        res.status(200).json(createdModels);
    } catch (error) {
        console.error('Error creating product vehicle models:', error);
        res.status(500).send(error.message);
    }
}







export {getAll,getProductVehicleModel,
    createProductVehicleModel,deleteProductVehicleModel,
    updateProductVehicleModel,createProductVehicleModelList, getProductVehicleModels} 