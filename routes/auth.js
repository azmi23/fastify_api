'use strict'
const Request = require('oauth2-server').Request
const Response = require('oauth2-server').Response
const client = require('../models/client')

module.exports = async function (fastify, opts) {
  
  fastify.post('/oauth/token', async (req, res) => {
    const request = new Request(req)
    const response = new Response(res)
    return fastify.oauth.token(request, response)
  })

  fastify.get('/client', async (req, res) => {
    try {
      const _client = await client(fastify).create({
        client_secret: 'mobile',
        grants: 'token'
      })
      if(_client){
        return res.send(_client)
      } else {
        return res.send(null)
      }
    } catch (error) {
      return res.send(error)
    }
  })
  
}
