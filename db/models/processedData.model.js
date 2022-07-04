const { Model, DataTypes, Sequelize } = require('sequelize')
const { RAW_DATA_TABLE } = require('./rawData.model')

const PROCESSED_DATA = 'processed_data'

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
        type: DataTypes.FLOAT,
        field: 'lean_body_mass'
    },
    bodyMassIndex: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'body_mass_index'
    },
    bodyFatPercentage: {
        allowNull: false,
        field: 'body_fat_percentage',
        type: DataTypes.FLOAT,
    },
    basalMetabolicRate: {
        allowNull: false,
        type: DataTypes.FLOAT,
        field: 'basal_metabolic_rate',
    },
    rawdataId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'raw_data_id',
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
            as: 'rawdata'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROCESSED_DATA,
            modelName: 'ProcessedData',
            timestamps: false
        }
    }
}

module.exports = { PROCESSED_DATA, ProcessedDataSchema, ProcessedData }