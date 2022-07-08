const express = require('express')

const ProcessedData = require('../services/processedData.service')

const router = express.Router()
const service = new ProcessedData()

router.get('/', async(req, res, next) => {
    try {
        const data = await service.find()
        res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/:id',
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

router.delete('/:id',
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