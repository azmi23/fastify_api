'use strict'
const { DataTypes } = require("sequelize")
const sequelize = require('sequelize')

module.exports = (fastify) => {
  try {
    const user = fastify.db.define('authorization', {
      authorizaton_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      redirect_uri: {
        type: DataTypes.STRING,
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