import CarModel from "../models/carModel.js";
import Vehicle from "../models/vehicle.js";
import Brand from "../models/brand.js";
import sequelize from '../config/dbConnection.js';
import { ProductCarModelService } from "../services/productCarModelService.js";

// controllers/carModelController.js

import { CarModelService } from "../services/carModelService.js";

const createCarModel = async (req, res) => {
    try {
        const carData = req.body;
        const forceCreation = req.query.force === 'true';
        
        const result = await CarModelService.createCarModel(carData, forceCreation);
        
        if (result.created) {
            res.status(201).json({
                success: true,
                message: result.message,
                data: result.newModel
            });
        } else {
            res.status(409).json({
                success: false,
                message: result.message,
                similarModel: result.similarModel
            });
        }
    } catch (error) {
        console.error('Error al crear nuevo modelo de coche:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear nuevo modelo de coche: ' + error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const { name } = req.query;
        let cars;
        if (name) {
            cars = await CarModel.findAll({
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }],
                where: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
            });
        } else {
            cars = await CarModel.findAll({
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }]
            });
        }
        res.status(200).send(cars);
    } catch (error) {
        console.error('Error retrieving cars:', error);
        res.status(500).send(error.message);
    }
};

const getCarModel = async (req, res) => {
    try {
        const carModelId = req.params.id;
        const carModel = await CarModel.findOne({
            where: {
                id: carModelId
            },
            include: [{
                model: Vehicle,
                as: 'vehicle'
            }]
        });

        if (!carModel) {
            return res.status(404).send('Car Model not found.');
        }

        res.status(200).send(carModel);
    } catch (error) {
        console.error('Error retrieving car model:', error);
        res.status(500).send(error.message);
    }
};

const updateCarModel = async (req, res) => {
    try {
        const carModelId = req.params.id;
        const updatedCarModelData = req.body;

        const carModel = await CarModel.findByPk(carModelId, { include: [{ model: Vehicle, as: 'vehicle' }] });

        if (!carModel) {
            return res.status(404).send("Car Model not found.");
        }

        await sequelize.transaction(async (t) => {
            await carModel.update(updatedCarModelData, { transaction: t });
        });

        const updatedCarModel = await CarModel.findByPk(carModelId, { include: [{ model: Vehicle, as: 'vehicle' }] });

        return res.status(200).send(updatedCarModel);
    } catch (error) {
        console.error('Error updating car model:', error);
        return res.status(500).send('Error updating car model: ' + error.message);
    }
};

const deleteCarModel = async (req, res) => {
    try {
        const carModelId = req.params.id;
        const carModel = await CarModel.findByPk(carModelId);

        if (!carModel) {
            res.status(404).send('Car Model not found.');
        } else {
            await carModel.destroy();
            res.status(204).send();
        }
    } catch (error) {
        console.error('Error deleting car model:', error);
        res.status(500).send(error);
    }
};

const getCarModelProducts = async (req, res) => {
    try {
        const carModelId = req.params.id;
        const productTypeId = req.query.productTypeId;
        const searchTerm = req.query.searchTerm;
        const page = parseInt(req.query.page) || 1;  // Establece un valor por defecto de 1 si no se proporciona
        const limit = parseInt(req.query.limit) || 10;  // Establece un valor por defecto de 10 si no se proporciona

        const productCarModels = await ProductCarModelService.getProductsByCarModel(carModelId, productTypeId, searchTerm, page, limit);

        res.status(200).send(productCarModels);
    } catch (error) {
        console.error('Error retrieving car model products:', error);
        res.status(500).send(error.message);
    }
}

const getAllCarModelsProducts = async (req, res) => {
    try {
        const productTypeId = req.query.productTypeId;
        const searchTerm = req.query.searchTerm;
        const page = parseInt(req.query.page) || 1;  // Establece un valor por defecto de 1 si no se proporciona
        const limit = parseInt(req.query.limit) || 20;  // Establece un valor por defecto de 10 si no se proporciona

        const productCarModels = await ProductCarModelService.getAllProductCarModels(page, limit, productTypeId, searchTerm);

        res.status(200).send(productCarModels);
    } catch (error) {
        console.error('Error retrieving car model products:', error);
        res.status(500).send(error.message);
    }
}



export { createCarModel, getAll, getCarModel, updateCarModel, deleteCarModel, getCarModelProducts, getAllCarModelsProducts };
