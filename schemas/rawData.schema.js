const Joi = require('joi');

const id = Joi.number().integer();
const number = Joi.number()
const date = Joi.date()
const integer = Joi.number()

const createRawDataSchema = Joi.object({
    weight: number.required(),
    height: number.required(),
    userId: integer.required(),
    createdAt: date.required(),
});

const getRawDataSchema = Joi.object({
    id: id.required(),
});

module.exports = { createRawDataSchema, getRawDataSchema }