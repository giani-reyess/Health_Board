const express = require('express')

const UsersRouter = require('./users.router')
const RawData = require('./rawData.router')
const ProcessedData = require('./processedData.router')

// Middleware router object
const routerApi = app => {

    // Run 'route' middleware in "/"
    const route = express.Router()
    app.use("/", route)

    // Routes stack
    route.use("/users", UsersRouter)
    route.use("/raw-data", RawData)
    route.use("/processed-data", ProcessedData)
}

module.exports = routerApi