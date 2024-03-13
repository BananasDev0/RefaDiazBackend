import VehicleModel from '../models/vehicleModel.js';
import sequelize from '../config/dbConnection.js';
import Brand from '../models/brand.js';
import Vehicle from '../models/vehicle.js';


const getAll = async (req, res) => {
    try {
        const models = await VehicleModel.findAll({
            include: [{ model: Vehicle, as: 'vehicle' }]
        });

        res.status(200).send(models);
    } catch (error) {
        console.error('Error retrieving vehicle models:', error);
        res.status(500).send('Error retrieving vehicle models: ' + error.message);
    }
};


const getModel = async (req, res) => {
    try {
        const modelId = req.params.id;
        const model = await VehicleModel.findByPk(modelId);

        if (!model) {
            res.status(404).send("Model not found.");
        } else {
            res.status(200).send(model);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createModel = async (req, res) => {
    try {
        const modelData = req.body;
        const brandId = modelData.brandId; // Suponiendo que el ID de la marca se envía como brandId en el cuerpo de la solicitud

        // Verificar si la marca existe
        const brandExists = await Brand.findByPk(brandId);
        if (!brandExists) {
            return res.status(404).send("Brand not found.");
        }

        const model = await sequelize.transaction(async (t) => {
            // Agregar la marca al objeto de datos del modelo
            modelData.BrandId = brandId;

            // Crear el nuevo modelo de vehículo
            const newModel = await VehicleModel.create(modelData, {
                include: [{ model: Vehicle, as: 'vehicle' }], 
                transaction: t
            });

            return newModel;
        });

        res.status(201).send(model.toJSON());
    } catch (error) {
        console.error('Error creating new vehicle model:', error);
        res.status(500).send('Error creating new vehicle model: ' + error.message);
    }
};




const updateModel = async (req, res) => {
    try {
        const modelId = req.params.id;
        const updatedData = req.body;
        const model = await VehicleModel.findByPk(modelId);

        if (!model) {
            res.status(404).send("Model not found.");
        } else {
            await model.update(updatedData);
            res.status(200).send(model);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteModel = async (req, res) => {
    try {
        const modelId = req.params.id;
        const model = await VehicleModel.findByPk(modelId);

        if (!model) {
            res.status(404).send("Model not found.");
        } else {
            await model.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error deleting model: ', error);
        res.status(500).send(error.message);
    }
}

export { getAll, getModel, createModel, updateModel, deleteModel };
