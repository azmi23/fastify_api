'user strict'
const {DataTypes, Model} = require('sequelize')
const sequelize = require('sequelize')
const { uuid } = require('uuidv4')

module.exports = (fastify) => {
  try {
    const user = fastify.db.define('user', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid()
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    return user
  } catch (error) {
    return error
  }
}