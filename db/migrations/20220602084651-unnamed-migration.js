'use strict';

const { RawDataSchema, RAW_DATA_TABLE } = require('../models/rawData.model')

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable(RAW_DATA_TABLE, RawDataSchema)
    },

    async down(queryInterface) {
        await queryInterface.dropTable(RAW_DATA_TABLE)
    }
};