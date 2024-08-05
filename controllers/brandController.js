import { Op } from "sequelize";
import Brand from "../models/brand.js";
import CarModel from "../models/carModel.js"; // Cambio aquí de VehicleModel a CarModel
import { BrandService } from "../services/brandService.js";

const getAll = async (req, res) => {
    try {
        let orderDirection = 'ASC';
        if (req.query.order === 'desc') {
            orderDirection = 'DESC';
        }

        let brands = await BrandService.getAllBrands(orderDirection);

        res.status(200).send(brands);
    } catch (error) {
        console.error('Error al recuperar las marcas:', error);
        res.status(500).send(error.message);
    }
};

const getBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await BrandService.getBrandById(brandId);

        if (!brand) {
            res.status(404).send('Resource not found.');
        } else {
            res.status(200).send(brand);
        }
    } catch (error) {
        console.error('Error al recuperar la marca:', error);
        res.status(500).send(error.message);
    }
}

const createNewBrand = async (req, res) => {
    try {
        const brandData = req.body;
        const brand = await BrandService.createBrand(brandData);
        res.status(200).send(brand);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const updatedData = req.body;
        const brand = await BrandService.updateBrand(brandId, updatedData);

        if (!brand) {
            res.status(404).send('Resource not found.');
        } else {
            res.status(200).send(brand);
        }
    } catch (error) {
        console.error('Error al actualizar la marca:', error);
        res.status(500).send(error.message);
    }
}

const deleteBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await BrandService.deleteBrand(brandId);

        if (!brand) {
            res.status(404).send('Resource not found.');
        } else {
            res.status(204).send(brand);
        }
    } catch (error) {
        console.error('Error al eliminar la marca:', error);
        res.status(500).send(error.message);
    }
}

const getBrandCarModels = async (req, res) => {
    try {
        const brandId = req.params.id;
        const { name } = req.query;

        const brand = await Brand.findByPk(brandId, {
            include: [{
                model: CarModel,
                as: 'carModels',
                where: {
                    ...(name && { name: { [Op.iLike]: `%${name}%` } }) // Usar iLike para ignorar capitalización
                }
            }]
        });

        if (!brand) {
            res.status(404).send('Resource not found.');
        } else {
            res.status(200).send(brand['carModels']);
        }

    } catch (error) {
        console.error('Error al recuperar los modelos de carros de la marca:', error);
        res.status(500).send(error.message);
    }
};


export { createNewBrand, getAll, deleteBrand, getBrand, updateBrand, getBrandCarModels }; // Cambiado a getBrandCarModels
