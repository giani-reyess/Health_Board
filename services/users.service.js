const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize')

class UserService {
    constructor() {}

    // Create new user
    async create(data) {
        const newData = await models.RawData.create(data)
        return newData
    }

    // Get all the users along its costumers
    async find() {
        const data = await models.RawData.findAll();
        return data
    }

    // Get one user by id
    async findOne(id) {
        const user = await models.RawData.findByPk(id)
        if (!user) {
            boom.notFound('user not found')
        }
        return user
    }

    // Update one user by id
    async update(id, changes) {
        const userId = await models.RawData.findByPk(id)
        const updateUser = await userId.update(changes)
        return updateUser
    }

    // Delete one user by id
    async delete(id) {
        const user = await models.RawData.findByPk(id)
        await user.destroy()
        return { id }
    }
}

module.exports = UserService;