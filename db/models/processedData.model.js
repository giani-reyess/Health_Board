const { Model, DataTypes, Sequelize } = require('sequelize')
const { RAW_DATA_TABLE } = require('./rawData.model')

const PROCESSED_DATA = 'process_data'

// Table shape
const ProcessedDataSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    leanBodyMass: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    bodyMassIndex: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    bodyFatPercentage: {
        allowNull: false,
        field: 'user_id',
        type: DataTypes.FLOAT,
    },
    basalMetabolicRate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    rawDataId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RAW_DATA_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

// API to interact with the db
class ProcessedData extends Model {

    static associate(models) {
        // Every rawData input has its own processedData output (1-RawData: 1-processedData) 
        this.belongsTo(models.RawData, {
            as: 'rawData'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: RAW_DATA_TABLE,
            modelName: 'ProcessedData',
            timestamps: false
        }
    }
}

module.exports = { PROCESSED_DATA, ProcessedDataSchema, ProcessedData }