const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class RawDataService {
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
        const data = await models.RawData.findByPk(id)
        if (!data) {
            boom.notFound('user not found')
        }
        return data
    }

    // Update one user by id
    async update(id, changes) {
        const dataId = await models.RawData.findByPk(id)
        const updateData = await dataId.update(changes)
        return updateData
    }

    // Delete one user by id
    async delete(id) {
        const data = await models.RawData.findByPk(id)
        await data.destroy()
        return { id }
    }
}

module.exports = RawDataService