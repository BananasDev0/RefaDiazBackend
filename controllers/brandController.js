import sequelize from "../config/dbConnection.js";
import Brand from "../models/brand.js";
import BrandType from "../models/brandType.js";

const getAll = async (req, res) => {
    try {
        let orderDirection = 'ASC'; 
        if (req.query.order === 'desc') {
            orderDirection = 'DESC';
        }

        const brands = await Brand.findAll({
            include : [{
                model : BrandType,
                as: 'brand_type'
            }],
            order: [['name', orderDirection]]
        });
      
        res.status(200).send(brands); 
    } catch (error) {
        console.error('Error al recuperar las marcas:', error);
        res.status(500).send(error.message);
    }
};


const getBrand = async(req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await Brand.findOne({ 
            where: { 
                id: brandId 
            },
            include:[{
                model : BrandType,
                as: 'brand_type'
            }] 
        });
       
        if(!brand) {
            res.status(404).send('Resource not found.');
            console.log("Resource not found.");
        } else {
            res.status(200).send(brand);    
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const createNewBrand = async(req, res) => {
    try {
        const brandData = req.body;
        const brand = await Brand.create(brandData);
        res.status(200).send(brand.toJSON());
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateBrand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const updatedData = req.body;

        const brand = await Brand.findByPk(brandId);

        if (!brand) {
            res.status(404).send("Resource not found.");
        } 

        const updatedBrandType = updatedData.brandType;
        delete updatedData.brandType;

        await sequelize.transaction(async (t)=> {
            await brand.update(updatedData,{transaction:t});

            if(updatedBrandType){
                await brand.brandType.update(updatedBrandType,{transaction:t})
            }

        });

        const updatedBrand = await Brand.findByPk(brandId,{include: [{model:BrandType, as:'brand_type'}]});
        
        res.status(200).send(updatedBrand);
        

    } catch (error) {
        console.error('Error al actualizar la marca:', error);
        res.status(500).send(error.message);
    }
}

const deleteBrand = async(req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await Brand.findByPk(brandId)

        if(!brand) {
            res.status(404).send('Resource not found.');
        } else {
            await brand.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar brand: ', error);
        res.status(500).send(error);
    }
}

export { createNewBrand, getAll, deleteBrand, getBrand, updateBrand };