/*
    In this file we configure sequelize
*/
const { Sequelize } = require('sequelize')
const setupModels = require('../db/models')
const { config } = require('../config/config')

// Setting enviroment varriables for db connection
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

// Initializing Sequelize and connect to db
const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: false,
})

setupModels(sequelize)

// Create all our models in db
// sequelize.sync()

module.exports = sequelize