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
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

// API to interact with the db
class RawData extends Model {

    // A raw_data input can belong to one users (N-User: 1-RawData)
    static associate(models) {
        // this.belongsTo(models.User, { as: 'user' })
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