import Vehicle from "../models/vehicle.js";
import VehicleModel from "../models/vehicle_model.js";
import Brand from "../models/brand.js";
import sequelize from '../config/dbConnection.js';

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

        console.error('Error creating new user:', error);
       
        res.status(500).send('Error creating new user: ' + error.message);
    }
};

const getAll = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll({
            include: [{
                model: VehicleModel,
                as: 'vehicleModel',
                include: [{
                    model: Brand,
                    as: 'brand'
                }]
            }]
        });
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
            }, {
                model: Brand,
                as: 'brand'
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

export { createVehicleModel, getAll, getVehicleModel, updateVehicle, deleteVehicle };
