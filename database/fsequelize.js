'use strict'

const fp = require('fastify-plugin')
const chalk = require('chalk')
const user = require('../models/user')
const models = require('../models')

module.exports = fp(async function (fastify, opts) {

  const config = {
    instance: 'db',
    autoconnect: true,
    dialect: 'mysql',



    host: process.env.HOST_DB,
    port: process.env.PORT_DB,
    database: process.env.DATABASE,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB
  }

  fastify.register(require('fastify-sequelize'), config).ready(async function () {
    // for(const modelDefiner of modelDefiners){
    //   modelDefiner(fastify)
    // }
    // console.log(fastify.db.models)
   
    // console.log(fastify.modelsDb)
    fastify.db
      .authenticate()
      .then(() => {
        console.log(chalk.green('Connection has been established successfully.'));
        
        // user(fastify).sync({
        //   force: true
        // })

        // fastify.db.sync()
        
      })
      .catch(err => {
        console.error(chalk.red('Unable to connect to the database:', err));
      });
  })
})