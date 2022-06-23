const boom = require('@hapi/boom')
const { models } = require('./../libs/sequelize')
const Calculator = require('../utils/calculator')

class ProcessedData {
    constructor() {}

    // Create new rawData input
    async create(data) {
        const calc = new Calculator(data)
        calc.leanBodyMass()
        calc.bodyMassIndex()
        calc.bodyFatPercentage()
        calc.basalMetabolicRate()
        const newData = await models.ProcessedData.create(data)
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

    // Update one rawData input by id
    async update(id, changes) {
        const dataId = await models.ProcessedData.findByPk(id)
        const updateData = await dataId.update(changes)
        return updateData
    }

    // Delete one rawData input by id
    async delete(id) {
        const data = await models.ProcessedData.findByPk(id)
        await data.destroy()
        return { id }
    }
}

module.exports = ProcessedData