import Vehicle from "../models/vehicle.js";
import VehicleModel from "../models/vehicleModel.js";
import Brand from "../models/brand.js";
import sequelize from '../config/dbConnection.js';
import ProductVehicleModel from "../models/productVehicleModel.js";
import Product from "../models/product.js";
import Radiator from "../models/radiator.js";
import ProductFile from "../models/productFile.js";
import File from "../models/file.js";

const createVehicleModel = async (req, res) => {
    try {
        const carData = req.body;
        const car = await sequelize.transaction(async (t) => {
            const newCar = await VehicleModel.create(carData, {
                include:
                    [
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
        let vehicles;
        if (name) {
            vehicles = await VehicleModel.findAll({
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }],
                where: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
            });
        } else {
            vehicles = await VehicleModel.findAll({
                include: [{
                    model: Vehicle,
                    as: 'vehicle'
                }]
            });
        }
        res.status(200).send(vehicles);
    } catch (error) {
        console.error('Error retrieving vehicles:', error);
        res.status(500).send(error.message);
    }
};

const getVehicleModel = async (req, res) => {
    try {
        const vehicleModelId = req.params.id;
        const vehicleModel = await VehicleModel.findOne({
            where: {
                id: vehicleModelId
            },
            include: [{
                model: Vehicle,
                as: 'vehicle'
            }]
        });

        if (!vehicleModel) {
            return res.status(404).send('Vehicle Model not found.');
        }

        res.status(200).send(vehicleModel);
    } catch (error) {
        console.error('Error retrieving vehicle model:', error);
        res.status(500).send(error.message);
    }
};

const updateVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const updatedVehicleData = req.body;

        const vehicle = await Vehicle.findByPk(vehicleId, { include: [{ model: VehicleModel, as: 'vehicleModel' }] });

        if (!vehicle) {
            return res.status(404).send("Vehicle not found.");
        }

        await sequelize.transaction(async (t) => {
            await vehicle.update(updatedVehicleData, { transaction: t });
        });

        const updatedVehicle = await Vehicle.findByPk(vehicleId, { include: [{ model: VehicleModel, as: 'vehicleModel' }] });

        return res.status(200).send(updatedVehicle);
    } catch (error) {
        console.error('Error updating vehicle:', error);
        return res.status(500).send('Error updating vehicle: ' + error.message);
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const vehicleId = req.params.id;
        const vehicle = await Vehicle.findByPk(vehicleId);

        if (!vehicle) {
            res.status(404).send('Vehicle not found.');
        } else {
            await vehicle.destroy();
            res.status(204).send();
        }
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).send(error);
    }
};

const getVehicleModelsRadiators = async (req, res) => {
    try {
        const vehicleModelId = req.params.id;
        const productVehicleModels = await ProductVehicleModel.findAll({
            where: { vehicleModelId: vehicleModelId },
            include: [{
                model: Product,
                as: 'product',
                include: [{  // Inclusión anidada para obtener los radiadores
                    model: Radiator,
                    as: 'radiator'
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

        const filteredProductVehicleModels = productVehicleModels.filter(item => item.product.radiator !== null);


        if (!filteredProductVehicleModels) {
            res.status(404).send('Resource not found.');
        } else {
            res.status(200).send(filteredProductVehicleModels);
        }
    } catch (error) {
        console.error('Error retrieving vehicle models radiators:', error);
        res.status(500).send(error.message);
    }
}

export { createVehicleModel, getAll, getVehicleModel, updateVehicle, deleteVehicle, getVehicleModelsRadiators };
