import Brand from "../models/brand.js";

const getAll = async () => {
    let brand = new Brand();
    brand.id = 2;
    brand.name = 'radiador chido'
    return [brand];
};

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

export { getAll, createBrand };