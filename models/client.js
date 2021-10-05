'use strict'
const { DataTypes } = require("sequelize")
const sequelize = require('sequelize')
const { uuid } = require("uuidv4")

module.exports = (fastify) => {
  try {
    const user = fastify.db.define('client', {
      client_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        defaultValue: uuid()
      },
      client_secret: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_uris: {
        type: DataTypes.STRING
      },
      grants: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    
    return user
  } catch (error) {
    return error
  }
}