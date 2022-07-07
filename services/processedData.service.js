const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { QueryTypes } = require('sequelize')
const Calculator = require('../utils/calculator')
const sequelize = require('../libs/sequelize')


class ProcessedData {
    constructor() {}

    // Create new processedData inputs
    async create(data) {

        // Get the field "birthDate" from the user with the given id
        const [userDate] = await sequelize.query(
            'SELECT birth_date FROM users WHERE id = ?', {
                replacements: [data.userid],
                type: QueryTypes.SELECT
            })

        console.log(userDate)

        // Get the field "sex" from the user with the given id
        const [userSex] = await sequelize.query(
            'SELECT sex FROM users WHERE id = ?', {
                replacements: [data.userid],
                type: QueryTypes.SELECT
            })


        // Calculate age from user birth date
        const currentDate = new Date()
        const userBirthDate = new Date(Object.values(userDate))
        const age = currentDate.getFullYear() - userBirthDate.getFullYear()
        console.log(currentDate, userDate, age)

        let stringUserSex = (Object.values(userSex)).toString()

        // Calculate data
        const calculatedData = Calculator.calculateAll(data.height, data.weight, age, stringUserSex)
        console.log(calculatedData)
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