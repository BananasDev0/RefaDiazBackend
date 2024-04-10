import Provider from '../models/provider.js';

const getAll = async(req, res) => {
    try{
        const providers = await Provider.findAll();
        res.status(200).send(providers);
    } catch(error) {
        res.status(500).send(error.message);
    }
}

const getProvider = async(req, res) => {
    try{
        const providerId = req.params.id;
        const provider = await Provider.findOne({
            where: {
                id: providerId
            }
        })
        
        if(!provider) {
            res.status(500).send("Resource not found.");
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