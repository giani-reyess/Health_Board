'use strict';

const { Users, USER_TABLE } = require('../models/users.model')

module.exports = {
    async up(queryInterface, sequelize) {
        await queryInterface.changeColumn(USER_TABLE, 'password', {
            type: sequelize.DataTypes.STRING,
            validate: {
                min: 12
            }
        })
    },

    async down(queryInterface) {
        await queryInterface.changeColumn(USER_TABLE)
    }
};