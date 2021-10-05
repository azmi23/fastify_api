const { default: fp } = require("fastify-plugin");

module.exports = fp(async function(fastify, opts) {
  const modelDefiners = [
    require('../models/user'),
    require('../models/token'),
    require('../models/authorization'),
    require('../models/client'),
    require('../models/refresh_token')
  ]

  for(const modelDefiner of modelDefiners){
    modelDefiner(fastify)
  }

  fastify.decorate('modelsDb', fastify.db.models)
  // console.log('fastify-db', fastify.db)
})