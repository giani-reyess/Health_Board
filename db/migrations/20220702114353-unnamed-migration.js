'use strict';

const { ProcessedData, PROCESSED_DATA } = require('../models/processedData.model')
const { RAW_DATA_TABLE } = require('../models/rawData.model')
module.exports = {
    async up(queryInterface, sequelize) {
        await queryInterface.addColumn(PROCESSED_DATA, 'id', {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: sequelize.DataTypes.INTEGER
            }),
            await queryInterface.addColumn(PROCESSED_DATA, 'lean_body_mass', {
                allowNull: false,
                type: sequelize.DataTypes.FLOAT,
            }),
            await queryInterface.addColumn(PROCESSED_DATA, 'body_mass_index', {
                allowNull: false,
                type: sequelize.DataTypes.FLOAT,
            }),
            await queryInterface.addColumn(PROCESSED_DATA, 'body_fat_percentage', {
                allowNull: false,
                type: sequelize.DataTypes.FLOAT,
            }),
            await queryInterface.addColumn(PROCESSED_DATA, 'basal_metabolic_rate', {
                allowNull: false,
                type: sequelize.DataTypes.DATE,
                defaultValue: sequelize.NOW
            }),
            await queryInterface.addColumn(PROCESSED_DATA, 'raw_data_id', {
                type: sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: RAW_DATA_TABLE,
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            })
    },

    async down(queryInterface) {
        await queryInterface.dropTable(PROCESSED_DATA)
    }
};