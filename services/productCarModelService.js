import CarModel from "../models/carModel.js";
import ProductCarModel from "../models/productCarModel.js";

export class ProductCarModelService {
    static async associateCarModelToProduct(productId, productCarModel, transaction) {
        return await ProductCarModel.create({ productId, ...productCarModel }, { transaction });
    }

    static async getProductCarModels(productId) {
        return await ProductCarModel.findAll({
            where: {
                productId
            },
            include: [
                {
                    model: CarModel,
                    as: 'carModel'
                }
            ]
        });
    }
}