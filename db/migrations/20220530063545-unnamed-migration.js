'use strict';

const { UserSchema, USER_TABLE } = require('../models/users.model')

module.exports = {
    async up(queryInterface, sequelize) {
        await queryInterface.changeColumn(USER_TABLE, 'sex', {
            type: sequelize.DataTypes.STRING,
            isIn: {
                args: [
                    ['male', 'female']
                ],
                msg: 'must be male or female'
            }
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable(USER_TABLE)
    }
};