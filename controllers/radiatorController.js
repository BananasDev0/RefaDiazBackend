import sequelize from "../config/dbConnection";
import Product from "../models/product";
import Radiator from "../models/radiator";

const getAllRadiator = async(req,res) => {
    try {
        const radiators = await Radiator.findAll({
            include: [{
                model : Product,
                as : 'product'
            }]
        });
            
        res.status(200).send(radiators);
    } catch (error) {
        console.error('Error retrieving radiators: ', error)
        res.status(500).send(error.message);
    }
}

const getRadiator = async(req, res) => {
    try{
        const radiatorId = req.params.id;
        const radiator = await Radiator.findOne({
            where: {
                id: radiatorId
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
            const newRadiator = await Product.create(radiatorData,{
                include:[{
                    model: Product,
                    as : 'product'
                }],
                transaction: t
            });
            return newRadiator;
        });
        
        res.status(200).send(radiator.toJson());
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateRadiator = async (req,res) => {
    try {
        const radiatorId = req.params.id;
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