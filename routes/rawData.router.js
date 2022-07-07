const express = require('express')

const RawDataService = require('../services/rawData.service')
const ProcessedDataService = require('../services/processedData.service')
const validatorHandler = require('../middlewares/validatorHandler')
const {
    createRawDataSchema,
    getRawDataSchema
} = require('../schemas/rawData.schema')

const router = express.Router()

const ProcessedData = new ProcessedDataService()
const RawData = new RawDataService()

router.get('/', async(req, res, next) => {
    try {
        const users = await RawData.find()
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
            const data = await RawData.findOne(id)
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
            // Save raw_data 
            const body = req.body
            const newDataInput = await RawData.create(body)

            // Create processed data
            const { height, weight, userId } = req.body

            let dataObject = {
                height: height,
                weight: weight,
                userid: userId
            }
            const newProcessedData = await ProcessedData.create(dataObject)
            res.status(201).json(newDataInput, newProcessedData)
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