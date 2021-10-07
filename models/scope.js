'use strict'
const { DataTypes } = require("sequelize")
const sequelize = require('sequelize')

module.exports = (fastify) => {
  try {
    const user = fastify.db.define('scope', {
      scope_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    return user
  } catch (error) {
    return error
  }
}