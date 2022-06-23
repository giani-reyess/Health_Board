'use strict';

const { RawData, RAW_DATA_TABLE } = require('../models/rawData.model')

module.exports = {
    async up(queryInterface, sequelize) {
        await queryInterface.changeColumn(RAW_DATA_TABLE, 'created_at', {
            type: sequelize.DataTypes.DATE,
            allowNull: true
        })
    },

    async down(queryInterface) {
        await queryInterface.changeColumn(RAW_DATA_TABLE)
    }
};