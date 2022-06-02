const { UserSchema, User } = require('./users.model')
const { RawDataSchema, RawData } = require('./rawData.model')


function setupModels(sequelize) {

    // Model intialization here
    User.init(UserSchema, User.config(sequelize))
    RawData.init(RawDataSchema, RawData.config(sequelize))

    // Associate models here
    RawData.associate(sequelize.model)
    User.associate(sequelize.model)
}

module.exports = setupModels