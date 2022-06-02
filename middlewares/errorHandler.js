const { ValidationError } = require('sequelize');

const logError = (err, req, res, next) => {
    console.log(logError)
    console.log(err)
    next(err)
}

const errorHandler = (err, req, res, next) => {
    console.log(errorHandler)
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
    next(err)
}

const boomErrorHandler = (err, req, res, next) => {
    if (err.isBoom) {
        const { output } = err
        res.status(output.statusCode).json(output.payload)
    }
    next(err)
}

const ormErrorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statuscode: 409,
            message: err.name,
            errors: err.errors
        })
    }
    next(err)
}

module.exports = { logError, errorHandler, boomErrorHandler, ormErrorHandler }