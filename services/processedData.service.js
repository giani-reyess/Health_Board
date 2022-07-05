const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const Calculator = require('../utils/calculator')


class ProcessedData {
    constructor() {}

    // Create new processedData inputs
    async create(data) {

        // Find the user that made the POST request
        const userData = models.User.findOne({
            where: { id: data.userId }
        })

        // Calculate age from user birth date
        const currentDate = new Date()
        const userDate = new Date(userData.birthDate)
        const age = currentDate.getFullYear() - userDate.getFullYear()

        // Gather needed data in an object
        const postObject = {
            height: data.height,
            weight: data.weight,
            age: age,
            sex: userData.sex
        }

        // Calculate data
        const calculatedData = Calculator.calculateAll(postObject)

        const newData = await models.ProcessedData.create(calculatedData)
        return newData
    }

    // Get all the processedData inputs 
    async find() {
        const data = await models.ProcessedData.findAll()
        return data
    }

    // Get one processedData input by id
    async findOne(id) {
        const data = await models.ProcessedData.findByPk(id)
        if (!data) {
            boom.notFound('Processed data not found')
        }
        return data
    }

    // Delete one processedData input by id
    async delete(id) {
        const data = await models.ProcessedData.findByPk(id)
        await data.destroy()
        return { id }
    }
}

module.exports = ProcessedData