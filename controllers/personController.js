import Person from "../models/person.js";

const getAll = async (req, res) => {
    try {
        const persons = await Person.findAll(); // Recupera todas las marcas de la base de datos
        res.status(200).send(persons); // Envía todas las marcas como respuesta
    } catch (error) {
        console.error('Error al recuperar las personas:', error);
        res.status(500).send(error.message);
    }
}
const getPerson = async(req, res) => {
    try {
        const personId = req.params.id;
        const person = await Person.findOne({ 
            where: { 
                id: personId 
            } 
        });
       
        if(!person) {
            res.status(404).send('Resource not found.');
            console.log("Resource not found.");
        } else {
            res.status(200).send(person);    
        }

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const createNewPerson = async(req, res) => {
    try {
        const personData = req.body;
        const person = await Person.create(personData);
        res.status(200).send(person.toJSON());
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updatePerson = async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedData = req.body;

        const person = await Person.findByPk(personId);

        if (!person) {
            res.status(404).send("Resource not found.");
        } else {
            await brand.update(updatedData);
            res.status(200).send(person);
        }

    } catch (error) {
        console.error('Error al actualizar a la persona:', error);
        res.status(500).send(error.message);
    }
}

const deletePerson = async(req, res) => {
    try {
        const personId = req.params.id;
        const person = await Person.findByPk(personId)

        if(!person) {
            res.status(404).send('Resource not found.');
        } else {
            await person.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.log('Error al borrar person: ', error);
        res.status(500).send(error);
    }
}

export { createNewPerson, getAll, deletePerson, getPerson, updatePerson };