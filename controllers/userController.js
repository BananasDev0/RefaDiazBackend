import User from "../models/user.js";
import Person from "../models/person.js";
import Role from "../models/role.js";
import sequelize from '../config/dbConnection.js';


const createNewUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = await sequelize.transaction(async (t) => {
            // Crea el usuario y la persona asociada en una sola operación
            const newUser = await User.create(userData, {
                include: [{
                    model: Person,
                    as: 'person'
                },{
                    model:Role,
                    as: 'role'
                }
            ], // Indica a Sequelize que incluya el modelo Person en la operación
                transaction: t
            });
            console.log(newUser.toJSON())
            return newUser;
        });

        res.status(201).send(user.toJSON());
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).send('Error creating new user: ' + error.message);
    }
};


const getAll = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Person,
                as: 'person'
            },{
                model: Role,
                as: 'role'
            }]
        });
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
            },
            include: [{
                model: Person,
                as: 'person'
            },{
                model:Role,
                as: 'role' 
            }] 
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
        const updatedUserData = req.body;

        const user = await User.findByPk(userId, { include: [{ model: Person, as: 'person' }] });

        if (!user) {
            return res.status(404).send("User not found.");
        }

        const updatedPersonData = updatedUserData.person;
        delete updatedUserData.person;

        await sequelize.transaction(async (t) => {
            await user.update(updatedUserData, { transaction: t });

            if (updatedPersonData) {
                await user.person.update(updatedPersonData, { transaction: t });
            }
        });
        const updatedUser = await User.findByPk(userId, { include: [{ model: Person, as: 'person' }] });

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).send('Error updating user: ' + error.message);
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

export { createNewUser, getAll, deleteUser, getUser, updateUser };
