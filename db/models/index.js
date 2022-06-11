const { UserSchema, User } = require('./users.model')
const { RawDataSchema, RawData } = require('./rawData.model')
const { ProcessedDataSchema, ProcessedData } = require('./processedData.model')


function setupModels(sequelize) {

    // Model intialization here
    User.init(UserSchema, User.config(sequelize))
    RawData.init(RawDataSchema, RawData.config(sequelize))
    ProcessedData.init(ProcessedDataSchema, ProcessedData.config(sequelize))

    // Associate models here
    RawData.associate(sequelize.models)
    User.associate(sequelize.models)
    ProcessedData.associate(sequelize.models)
}

module.exports = setupModels