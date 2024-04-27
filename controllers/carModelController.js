import CarModel from "../models/carModel.js";
import Vehicle from "../models/vehicle.js";
import Brand from "../models/brand.js";
import sequelize from '../config/dbConnection.js';
import Product from "../models/product.js";
import Radiator from "../models/radiator.js";
import ProductFile from "../models/productFile.js";
import File from "../models/file.js";
import ProductCarModel from "../models/productCarModel.js";

const createCarModel = async (req, res) => {
    try {
        const carData = req.body;
        const car = await sequelize.transaction(async (t) => {
            const newCar = await CarModel.create(carData, {
                include: [
                    {
                        model: Vehicle,
                        as: 'vehicle'
                    },
                    {
                        model: Brand,
                        as: 'brand'
                    }
                ],
                transaction: t
            });
            console.log(newCar.toJSON())
            return newCar;
        });

        res.status(201).send(car.toJSON());
    } catch (error) {
        console.error('Error creating new car:', error);
        res.status(500).send('Error creating new car: ' + error.message);
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
        res.status(500). send(error.message);
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

const getCarModelRadiators = async (req, res) => {
    try {
        const carModelId = req.params.id;
        const productCarModels = await ProductCarModel.findAll({
            where: { carModelId: carModelId },  // Asumiendo que la clave foránea en ProductVehicleModel se ha actualizado a carModelId
            include: [{
                model: Product,
                as: 'product',
                include: [{
                    model: Radiator,
                    as: 'radiator'  // Asumiendo que Radiator está directamente relacionado con Product
                },
                {
                    model: ProductFile,
                    as: 'productFiles',
                    include: [{
                        model: File,
                        as: 'file'
                    }]
                }]
            }]
        });

        const filteredProductCarModels = productCarModels.filter(item => item.product && item.product.radiator !== null);

        if (filteredProductCarModels.length === 0) {
            res.status(404).send('Resource not found.');
        } else {
            res.status(200).send(filteredProductCarModels);
        }
    } catch (error) {
        console.error('Error retrieving car models radiators:', error);
        res.status(500).send(error.message);
    }
}


export { createCarModel, getAll, getCarModel, updateCarModel, deleteCarModel, getCarModelRadiators };
