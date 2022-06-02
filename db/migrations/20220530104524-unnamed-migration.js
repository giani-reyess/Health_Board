'use strict';

const { UserSchema, USER_TABLE } = require('../models/users.model')

module.exports = {
    async up(queryInterface, sequelize) {
        await queryInterface.changeColumn(USER_TABLE, 'sex', {
            type: sequelize.DataTypes.ENUM(['male', 'female']),
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable(USER_TABLE)
    }
};