'use strict'
const { DataTypes } = require("sequelize")
const sequelize = require('sequelize')

module.exports = (fastify) => {
  try {
    const grant = fastify.db.define('grant', {
      grant_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
    return grant
  } catch (error) {
    return error
  }
}