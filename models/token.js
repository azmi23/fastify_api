
'use strict'
const { DataTypes } = require("sequelize")
const sequelize = require('sequelize')

module.exports = (fastify) => {
  try {
    const user = fastify.db.define('token', {
      access_token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      client_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    return user
  } catch (error) {
    return error
  }
}