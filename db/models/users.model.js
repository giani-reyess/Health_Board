const { Model, DataTypes, Sequelize } = require('sequelize')

const USER_TABLE = 'users'

// Table shape
const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            min: 12
        }
    },
    birthDate: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'birth_date'
            // calculate age
    },
    sex: {
        allowNull: false,
        type: DataTypes.ENUM(['female', 'male']),
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
}

// API to interact with the db
class User extends Model {

    // A user can have many raw_data inputs (N-User: 1-RawData)
    static associate(models) {
        this.hasMany(models.RawData, {
            as: 'rawdata',
            foreignKey: 'userId'
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

module.exports = { USER_TABLE, UserSchema, User }