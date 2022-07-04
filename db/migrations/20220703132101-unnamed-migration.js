'use strict';

const { ProcessedDataSchema, PROCESSED_DATA } = require('../models/processedData.model')

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(PROCESSED_DATA, ProcessedDataSchema)
    },

    async down(queryInterface) {
        await queryInterface.dropTable(PROCESSED_DATA)
    }
}