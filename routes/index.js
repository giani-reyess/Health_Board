const express = require('express')
const usersRouter = require('./users.router')

// Middleware router object
const routerApi = app => {

    // Run 'route' middleware in "/"
    const route = express.Router()
    app.use("/", route)

    // Routes stack
    route.use("/users", usersRouter)
}

module.exports = routerApi