const { Model, DataTypes, Sequelize } = require('sequelize')
const { USER_TABLE } = require('./users.model')

const RAW_DATA_TABLE = 'raw_data'

// Table shape
const RawDataSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    weight: {
        allowNull: false,
        type: DataTypes.FLOAT
    },
    height: {
        allowNull: false,
        type: DataTypes.FLOAT,
    },
    userId: {
        allowNull: false,
        field: 'user_id',
        type: DataTypes.INTEGER,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

// API to interact with the db
class RawData extends Model {

    static associate(models) {
        // A rawData input can belong to only one user (N-User: 1-RawData)
        this.belongsTo(models.User, {
            as: 'user'
        })

        // Every rawData input has its own processedData output (1-RawData: 1-processedData)  
        this.hasOne(models.ProcessedData, {
            as: 'processedData'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: RAW_DATA_TABLE,
            modelName: 'RawData',
            timestamps: false
        }
    }
}

module.exports = { RAW_DATA_TABLE, RawDataSchema, RawData }