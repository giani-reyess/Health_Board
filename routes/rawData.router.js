const express = require('express')

const ProcessedData = require('../services/processeData.service')
const RawDataService = require('../services/rawData.service')
const validatorHandler = require('../middlewares/validatorHandler')
const {
    createRawDataSchema,
    getRawDataSchema
} = require('../schemas/rawData.schema')

const router = express.Router()

const calculate = new ProcessedData()
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

            // Save and calculate body parameters using raw_data 
            // const newProcessedData = await calculate.create(body)

            res.status(201).json(newDataInput)
                // res.status(201).json(newProcessedData)
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