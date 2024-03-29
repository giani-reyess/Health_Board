const boom = require('@hapi/boom')
const { models } = require('./../libs/sequelize')

class UserService {
    constructor() {}

    // Create new user
    async create(data) {
        const newData = await models.User.create(data)
        return newData
    }

    // Get all the users along its costumers
    async find() {
        const data = await models.User.findAll({
            include: ['rawdata']
        })
        return data
    }

    // Get one user by id
    async findOne(id) {
        const user = await models.User.findByPk(id)
        if (!user) {
            boom.notFound('user not found')
        }
        return user
    }

    // Update one user by id
    async update(id, changes) {
        const userId = await models.User.findByPk(id)
        const updateUser = await userId.update(changes)
        return updateUser
    }

    // Delete one user by id
    async delete(id) {
        const user = await models.User.findByPk(id)
        await user.destroy()
        return { id }
    }
}

module.exports = UserService;