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

        // Get the field "sex" from the user with the given id
        const [userSex] = await sequelize.query(
            'SELECT sex FROM users WHERE id = ?', {
                replacements: [data.userid],
                type: QueryTypes.SELECT
            })


        const [lastRawdataId] = await sequelize.query(
            'SELECT id FROM raw_data ORDER BY id DESC LIMIT 1', {
                replacements: [data.userid],
                type: QueryTypes.SELECT
            })


        const rawdataId = parseInt(Object.values(lastRawdataId))

        console.log(rawdataId)

        // Calculate age from user birth date
        const currentDate = new Date()
        const userBirthDate = new Date(Object.values(userDate))
        const age = currentDate.getFullYear() - userBirthDate.getFullYear()
        console.log(currentDate, userDate, age)

        let stringUserSex = (Object.values(userSex)).toString()

        // Calculate body parameters
        const calc = new Calculator(data.height, data.weight, age, stringUserSex)
        const calculatedData = calc.calculateAll()

        const ObjectToPost = {
            ...calculatedData,
            rawdataId
        }

        console.log(calculatedData, ObjectToPost)

        const newData = await models.ProcessedData.create(ObjectToPost)
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