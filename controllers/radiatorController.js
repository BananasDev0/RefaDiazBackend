import Radiator from "../models/radiator";

const getAll = async(req,res) => {
    try {
        const radiators = await Radiator.findAll();
        res.status(200).send(radiators);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getRadiator = async(req, res) => {
    try{
        const radiatorId = req.params.id;
        const radiator = await Radiator.findOne({
            where: {
                id: radiatorId
            }
        })
        
        if(!radiator) {
            res.status(500).send("Resource not found.");
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
        const radiator = await Radiator.create(radiatorData);
        res.status(200).send(radiator.toJson());
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateRadiator = async (req,res) => {
    try {
        const radiatorId = req.params.id;
        const updateData = req.body;
        const radiator = await Radiator.findByPk(radiatorId)

        if(!radiator){
            res.status(404).send("Resource not found.")
        }else{
            await radiator.update(updateData);
            res.status(204).send(product);
        }

    } catch (error) {
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

export {getAll,getRadiator,createRadiator,updateRadiator,deleteRadiator}