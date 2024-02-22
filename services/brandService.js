import Brand from "../models/brand.js";

const createBrand = async(brandData) => {
    try {
        const brand = await Brand.create(brandData);
        console.log('Producto creado: ', brand.toJSON());
        return brand;
    } catch (error) {
        console.log('Error al crear un producto: ', error);
        throw error;
    }
}

export { createBrand };