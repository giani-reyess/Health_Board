'use strict';

const { Users, USER_TABLE } = require('../models/users.model')

module.exports = {
    async up(queryInterface, sequelize) {
        await queryInterface.changeColumn(USER_TABLE, 'created_at', {
            type: sequelize.DataTypes.DATEONLY,
            allowNull: false
        })
    },

    async down(queryInterface) {
        await queryInterface.changeColumn(USER_TABLE)
    }
};