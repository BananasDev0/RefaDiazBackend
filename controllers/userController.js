
import { UserService } from "../services/userServce.js";


const createNewUser = async (req, res) => {
    try {
        const userData = req.body;
        const user = await UserService.createNewUser(userData)
        
        res.status(201).send(user.toJSON());
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).send('Error creating new user: ' + error.message);
    }
};


const getAll = async (req, res) => {
    try {
        const users = await UserService.getAllUsers()
        res.status(200).send(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send(error.message);
    }
};

const getUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUser(userId)
 
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
        const updatedUser = await UserService.updateUser(userId,updatedUserData)

        if (!updatedUser) {
            return res.status(404).send("User not found.");
        }

        return res.status(200).send(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).send('Error updating user: ' + error.message);
    }
};

const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.deleteUser(userId)

        if(!user) {
            res.status(404).send('User not found.');
        } else {
            res.status(204).send();
        }

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send(error);
    }
};

export { createNewUser, getAll, deleteUser, getUser, updateUser };
