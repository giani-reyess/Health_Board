const boom = require('@hapi/boom')
const { models } = require('./../libs/sequelize')
const Calculator = require('../utils/calculator')


class ProcessedData {
    constructor() {}

    // Create new rawData input
    async create(data) {
        const calculatedData = Calculator.calculateAll(data)
        const newData = await models.ProcessedData.create(calculatedData)
        return newData
    }

    // Get all the rawData input 
    async find() {
        const data = await models.ProcessedData.findAll();
        return data
    }

    // Get one rawData input by id
    async findOne(id) {
        const data = await models.ProcessedData.findByPk(id)
        if (!data) {
            boom.notFound('Processed data not found')
        }
        return data
    }

    // Delete one rawData input by id
    async delete(id) {
        const data = await models.ProcessedData.findByPk(id)
        await data.destroy()
        return { id }
    }
}

module.exports = ProcessedData