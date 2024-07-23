import User from "../models/user.js";
import Person from "../models/person.js";
import Role from "../models/role.js";
import sequelize from '../config/dbConnection.js';

export class UserService {
    static async createNewUser(userData) {
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
            return newUser;
        });
        return user;
    }

    static async getAllUsers(){
        const users = await User.findAll({
            include: [{
                model: Person,
                as: 'person'
            },{
                model: Role,
                as: 'role'
            }]
        });
        return users;
    }

    static async getUser(userId) {
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
        return user;
    }

    static async deleteUser(userId){
        const user = await User.findByPk(userId);

        if(!user){
            return false;
        }

        await user.destroy();
        return true;
    }

    static async updateUser(userId,updatedUserData){
        const user = await User.findByPk(userId, { include: [{ model: Person, as: 'person' }] });

        if (!user) {
            return false
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

        return updatedUser;
    }
}