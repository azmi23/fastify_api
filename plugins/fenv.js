const fastify = require('fastify')()
const fastifyEnv = require('fastify-env')
const { default: fp } = require('fastify-plugin')
fp

module.exports = fp(async function(fastify, opts){
  const schema = {
    type: 'object',
    required: [ 'PORT' ],
    properties: {
      PORT: {
        type: 'string',
        default: 3000
      }
    }
  }
  
  const options = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    // data: data // optional, default: process.env
  }
  
  fastify
    .register(fastifyEnv, options)
    .ready((err) => {
      if (err) console.error(err)
  
      console.log(fastify.config)
      console.log('port_db', process.env.port_db) // or fastify[options.confKey]
      // output: { PORT: 3000 }
    })
})
