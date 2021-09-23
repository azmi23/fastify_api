'use strict'

const fp = require('fastify-plugin')
const chalk = require('chalk')
const user = require('../models/user')

module.exports = fp(async function (fastify, opts) {

  const config = {
    instance: 'db',
    autoconnect: true,
    dialect: 'mysql',


    
    host: process.env.host_db,
    port: process.env.port_db,
    database: process.env.database,
    username: process.env.username_db,
    password: process.env.password_db
  }

  fastify.register(require('fastify-sequelize'), config).ready(async function () {
    fastify.db
      .authenticate()
      .then(() => {
        console.log(chalk.green('Connection has been established successfully.'));
        console.log(process.env.port_db)
        
        // fastify.db.sync()
      })
      .catch(err => {
        console.error(chalk.red('Unable to connect to the database:', err));
      });
  })
})