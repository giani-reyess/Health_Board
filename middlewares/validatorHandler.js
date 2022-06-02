const boom = require("@hapi/boom")

// 'property' is from where data is coming (body, params etc)
const validatorHandler = (schema, property) => {
    // Validate incoming data from 'property'
    return (req, res, next) => {
        const data = req[property]
        const { error } = schema.validate(data)

        if (error) {
            next(boom.badRequest(error))
        }
        next()
    }
}

module.exports = validatorHandler