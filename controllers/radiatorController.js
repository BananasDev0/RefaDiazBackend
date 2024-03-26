import { Op } from "sequelize";
import sequelize from "../config/dbConnection.js";
import Product from "../models/product.js";
import Radiator from "../models/radiator.js";

const getAllRadiator = async (req, res) => {
    try {
        const { name } = req.query; // Obtiene el parámetro "name" de la consulta

        // Construye el objeto de opciones de consulta basado en la presencia del parámetro "name"
        let queryOptions = {
            include: [{
                model: Product,
                as: 'product',
                where: {}
            }]
        };

        if (name) {
            queryOptions.include[0].where.productName = {
                // Utiliza 'Op.iLike' para búsquedas insensibles a mayúsculas/minúsculas (solo PostgreSQL)
                // Cambia a 'Op.like' si tu DB no soporta 'Op.iLike'
                [Op.iLike]: `%${name}%` // Busca cualquier coincidencia que contenga "name"
            };
        }

        const radiators = await Radiator.findAll(queryOptions);

        res.status(200).send(radiators);
    } catch (error) {
        console.error('Error retrieving radiators:', error);
        res.status(500).send(error.message);
    }
};


const getRadiator = async(req, res) => {
    try{
        const radiatorId = req.params.dpi;
        const radiator = await Radiator.findOne({
            where: {
                dpi: radiatorId
            },
            include : [{
                model:Product,
                as:'product'
            }]
        })
        
        if(!radiator) {
            res.status(404).send("Resource not found.");
            console.log('Radiator not found');
        } else {
            res.status(200).send(radiator)
        }

    } catch(error) {
        res.status(500).send(error.message);
    }   
}

const createRadiator = async (req,res) => {
    try {
        const radiatorData = req.body;
        const radiator = await sequelize.transaction(async (t)=>{
            const newRadiator = await Radiator.create(radiatorData,{
                include:[{
                    model: Product,
                    as : 'product'
                }],
                transaction: t
            });

            return newRadiator;
        });
        
        res.status(201).send(radiator);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateRadiator = async (req,res) => {
    try {
        const radiatorId = req.params.dpi;
        const updateRadiatorData = req.body;

        const radiator = await Radiator.findByPk(radiatorId,{include:[{model:Product,as:'product'}]});

        if(!radiator){
            res.status(404).send("Resource not found.")
        }

        const updatedProductData = updateRadiatorData.product;
        delete updateRadiatorData.product;

        await sequelize.transaction(async (t) => {
            await radiator.update(updateRadiatorData,{transaction:t});

            if(updatedProductData){
                await radiator.product.update(updatedProductData, {transaction:t});
            }

        });
        const updatedRadiator = await Radiator.findByPk(radiatorId,{include :[{model:Product,as:'product'}]});

        res.status(204).send(updatedRadiator);
        

    } catch (error) {
        console.error('Error updating radiator:', error);
        res.status(500).send(error.message);
    }
}

const deleteRadiator = async(req,res) => {
    try {
        const radiatorId = req.params.id;
        const radiator = await Radiator.findByPk(radiatorId)

        if(!radiator){
            res.status(404).send("Resource not found.")
        }else{
            await radiator.destroy()
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar radiator: ', error);
        res.status(500).send(error);
    }
}

export {getAllRadiator,getRadiator,createRadiator,updateRadiator,deleteRadiator}