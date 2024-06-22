import File from "../models/file.js";
import { Op } from 'sequelize';

export class FileService {
    static async getFile(objectId, fileTypeId) {
        const file = await File.findOne({
            where: {
                objectId,
                fileTypeId
            }
        });
        return file;
    }

    static async getFiles(objectIds, fileTypeId) {
        const files = await File.findAll({
            where: {
                objectId: {
                    [Op.in]: objectIds
                },
                fileTypeId: fileTypeId
            }
        });
        return files;
    }

    static async createFile(fileData) {
        const file = await File.create(fileData);
        return file;
    }

    static async updateFile(fileId, updatedData) {
        let file = await File.findByPk(fileId);
        if (!file) {
            return null;
        }

        await file.update(updatedData);
        return file;
    }
    
    static async createProductFiles(files, productId) {
        let createdFiles = [];

        for (let file of files) {
            let createdFile = await FileService.createFile({ ...file, objectId: productId });
            createdFiles.push(createdFile);
        }

        return createdFiles;
    }

    static async getExcludedFiles(objectId, fileTypeId, excludedFilesIds) {
        const files = await File.findAll({
            where: {
                objectId,
                fileTypeId,
                id: {
                    [Op.notIn]: excludedFilesIds
                }
            }
        });
        return files;
    }

    static async deleteBulkFiles(objectId, fileTypeId, fileIds, transaction) {
        await File.destroy({
            where: {
                objectId,
                fileTypeId,
                id: {
                    [Op.in]: fileIds
                }
            },
            transaction // include transaction in the destroy operation
        });
    }
}