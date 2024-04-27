import File from "../models/file.js";
import { Op } from 'sequelize';

export const getFile = async (objectId, fileTypeId) => {
    const file = await File.findOne({
        where: {
            objectId,
            fileTypeId
        }
    });
    return file;
}

export const getFiles = async (objectIds, fileTypeId) => {
    const files = await File.findAll({
        where: {
            objectId: {
                [Op.in]: objectIds
            },
            fileTypeId: fileTypeId
        }
    });
    console.log("asdasd", files.length)
    return files;
}

export const FileConstants = {
    ProductImage: 2,
    BrandImage: 1,
}

export const attachFileToBrand = async (brand, files) => {
    const brandFile = files.find(file => file.objectId === brand.id);
    brand.file = brandFile;
    return brand;
}
