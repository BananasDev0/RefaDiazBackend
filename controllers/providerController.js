import Provider from '../models/provider.js';
const getAll = async (req, res) => {
    try {
        const { page, limit } = req.query;

        if (!page || !limit) {
            const providers = await Provider.findAll();
            return res.status(200).send({ providers: providers });
        }

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const totalCount = await Provider.count();

        if (offset >= totalCount) {
            return res.status(200).send({ message: "No hay más resultados disponibles." });
        }
        
        const providers = await Provider.findAll({
            offset: offset,
            limit: parseInt(limit)
        });        

        res.status(200).send({ providers: providers, totalCount: totalCount });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const getProvider = async(req, res) => {
    try{
        const providerId = req.params.id;
        const provider = await Provider.findOne({
            where: {
                id: providerId
            }
        })
        
        if(!provider) {
            res.status(404).send("Resource not found.");
        } else {
            res.status(200).send(provider)
        }

    } catch(error) {
        res.status(500).send(error.message);
    }   
}

const createProvider = async(req, res) => {
    try{
        const providerData = req.body;
        const provider = await Provider.create(providerData);
        res.status(200).send(provider.toJSON());
    }catch (error) {
        res.status(500).send(error.message);
    }
}

const updateProvider = async(req, res) => {
    try{
        const providerId = req.params.id;
        const updatedData = req.body;
        const provider = await Provider.findByPk(providerId);

        if(!provider) {
            res.status(404).send("Resource not found.")
        } else {
            await provider.update(updatedData);
            res.status(204).send(provider);
        }

    } catch(error) {
        res.status(500).send(error.message);
    }
}

const deleteProvider = async(req, res) => {
    try {
        const providerId = req.params.id;
        const provider = await Provider.findByPk(providerId)

        if(!provider) {
            res.status(404).send('Resource not found.');
        } else {
            await provider.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar proveedor: ', error);
        res.status(500).send(error);
    }
}

export { getAll, getProvider, createProvider, updateProvider, deleteProvider }