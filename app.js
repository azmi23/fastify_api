'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application

  fastify.register(require('./database/fsequelize'))
  fastify.register(require('./database/models'))
  fastify.register(require('fastify-formbody'))

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes/guest'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes/user'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes/admin'),
    options: Object.assign({}, opts)
  })


  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'models'),
  //   options: Object.assign({}, opts)
  // })

  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'controllers'),
  //   options: Object.assign({}, opts)
  // })
}
