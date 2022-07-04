const express = require('express')

const RawDataService = require('../services/rawData.service')
const validatorHandler = require('../middlewares/validatorHandler')
const {
    createRawDataSchema,
    getRawDataSchema
} = require('../schemas/rawData.schema')

const router = express.Router()

const service = new RawDataService()

router.get('/', async(req, res, next) => {
    try {
        const users = await service.find()
        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.get('/:id',
    validatorHandler(getRawDataSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            const data = await service.findOne(id)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
)

router.post('/',
    validatorHandler(createRawDataSchema, 'body'),
    async(req, res, next) => {
        try {
            const body = req.body
                // Save raw_data 
            const newDataInput = await service.create(body)
                // Redirect data to '/processed-data' 
            res.status(201).json(newDataInput)
            res.redirect(307, '/processed-data')
        } catch (error) {
            next(error)
        }
    }
)


router.delete('/:id',
    validatorHandler(getRawDataSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params
            await service.delete(id)
            res.status(201).json({ id })
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router