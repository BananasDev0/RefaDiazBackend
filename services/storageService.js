import { firebaseInstance } from "../config/fireBaseConfig.js";

export class StorageService {
    static async deleteBulkStorageFiles(bucketPaths) {
        const bucket = firebaseInstance.storage().bucket();

        const deletePromises = bucketPaths.map(async (path) => {
            try {
                await bucket.file(path).delete();
                console.log(`Archivo eliminado con éxito: ${path}`);
            } catch (error) {
                console.error(`Error al eliminar el archivo ${path}:`, error);
                // Opcionalmente, puedes lanzar el error aquí si quieres que falle toda la operación
                // throw error;
            }
        });

        await Promise.all(deletePromises);
    }
}