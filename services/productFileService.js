import File from "../models/file.js";
import { Op } from 'sequelize';
import { FileConstants } from "../utils/fileConstants.js";

export class ProductFileService {
    static async updateProductFiles(productId, updatedData, transaction) {
        try {
            const files = await File.findAll({ 
                where: {
                    objectId: {
                        [Op.in]: productId
                    }, 
                    fileTypeId: FileConstants.ProductImage
                },
                transaction
            });
    
            for (let file of files) {
                const fileData = updatedData.find(data => data.objectId === file.objectId);
               
                if (fileData) {
                    await file.update(fileData, { transaction });
                }
            }
            return files;
        } catch(error) {
            throw error;
        } 
    }
    
}
