import CarModel from "../models/carModel.js";
import { Op } from "sequelize";
import stringSimilarity from 'string-similarity';
import sequelize from "../config/dbConnection.js";

export class CarModelService {
    /**
     * Crea un nuevo CarModel después de verificar que no existe uno similar.
     * @param {Object} carModelData - Datos del CarModel a crear.
     * @param {boolean} [forceCreation=false] - Permitir la creación forzada del modelo.
     * @returns {Promise<Object>} - La respuesta con información sobre la creación del CarModel.
     * @throws {Error} - Si ya existe un CarModel similar y no se permite la creación forzada.
     */
    static async createCarModel(carModelData, forceCreation = false) {
        return await sequelize.transaction(async (t) => {
            const { name } = carModelData;
            if (!name || !name.trim()) {
                throw new Error('El nombre del CarModel es obligatorio.');
            }

            const trimmedName = name.trim();
            const existingCarModels = await CarModel.findAll({ transaction: t });
            const existingNames = existingCarModels.map(cm => cm.name.toLowerCase());
            const { bestMatch } = stringSimilarity.findBestMatch(trimmedName.toLowerCase(), existingNames);

            const similarityThreshold = 0.8;
            const isSimilarModelExists = bestMatch.rating >= similarityThreshold;

            if (isSimilarModelExists && !forceCreation) {
                const similarModel = existingCarModels.find(cm => cm.name.toLowerCase() === bestMatch.target);
                return {
                    created: false,
                    similarModelExists: true,
                    similarModel: {
                        id: similarModel.id,
                        name: similarModel.name
                    },
                    message: `Ya existe un CarModel similar llamado "${similarModel.name}".`
                };
            }

            const newCarModel = await CarModel.create(carModelData, { transaction: t });
            return {
                created: true,
                similarModelExists: isSimilarModelExists,
                newModel: newCarModel,
                message: isSimilarModelExists
                    ? 'Se ha creado un nuevo CarModel a pesar de existir uno similar.'
                    : 'Se ha creado un nuevo CarModel.'
            };
        });
    }

    // Otros métodos...
}
