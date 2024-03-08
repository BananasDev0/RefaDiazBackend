import User from "../models/user.js";
import Person from "../models/person.js";
import sequelize from '../config/dbConnection.js';


const createNewUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        // Crea tanto el usuario como la persona asociada en una sola transacción
        const user = await sequelize.transaction(async (t) => {
            // Crea la persona asociada al usuario
            const person = await Person.create(userData.person, { transaction: t });

            // Crea el usuario asociado a la persona creada
            return await User.create({
                person_id: person.id, 
                active: userData.active
            }, { transaction: t });
        });

        res.status(200).send(user.toJSON());
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send(error.message);
    }
};

const getUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ 
            where: { 
                id: userId 
            } 
        });
       
        if(!user) {
            res.status(404).send('User not found.');
            console.log("User not found.");
        } else {
            res.status(200).send(user);    
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};


const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).send("User not found.");
        } else {
            await user.update(updatedData);
            res.status(200).send(user);
        }

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send(error.message);
    }
};

const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);

        if(!user) {
            res.status(404).send('User not found.');
        } else {
            await user.destroy();
            res.status(204).send();
        }

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send(error);
    }
};

export { createNewUser, getAllUsers, deleteUser, getUser, updateUser };
