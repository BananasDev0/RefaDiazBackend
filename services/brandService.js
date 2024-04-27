import Brand from "../models/brand.js";
import BrandType from "../models/brandType.js";
import { FileConstants } from "../utils/fileConstants.js";
import { FileService } from "./fileService.js";
import sequelize from '../config/dbConnection.js';

export class BrandService {

    static async createBrand(brandData) {
        let brand = await Brand.create(brandData);
        const file = await FileService.createFile({ ...brandData.file, fileTypeId: FileConstants.BrandImage, objectId: brand.id });
        brand.setDataValue('file', file);
        return brand;
    }

    static async getAllBrands(orderDirection) {
        let brands = await Brand.findAll({
            include: [{
                model: BrandType,
                as: 'brandType'
            }],
            order: [['name', orderDirection]],
            where: {
                active: true
            }
        });

        let files = await FileService.getFiles(brands.map(brand => brand.id), FileConstants.BrandImage)
        brands.map(brand => (this.attachFileToBrand(brand, files)));
        return brands;
    }

    static async getBrandById(id) {
        let brand = await Brand.findOne({
            include: [{
                model: BrandType,
                as: 'brandType'
            }],
            where: {
                id,
                active: true
            }
        });

        if (!brand) {
            return null;
        }

        const files = await FileService.getFiles([id], FileConstants.BrandImage);
        return this.attachFileToBrand(brand, files);
    }

    static async updateBrand(id, updatedData) {
        let brand = await Brand.findByPk(id);
        if (!brand) {
            return null;
        }

        await sequelize.transaction(async (t) => {
            await brand.update(updatedData, { transaction: t });

            if (updatedData.file) {
                await FileService.updateFile(updatedData.file.id, updatedData.file);
            }
        });

        const updatedBrand = await this.getBrandById(id);
        return updatedBrand;
    }

    static async deleteBrand(id) {
        const brand = await Brand.findByPk(id);
        if (brand) {
            brand.active = false;
            await brand.save();
            return brand;
        } else {
            return null;
        }
    }

    static attachFileToBrand(brand, files) {
        const brandFile = files.find(file => file.objectId === brand.id);
        brand.setDataValue('file', brandFile)
        return brand;
    }
}