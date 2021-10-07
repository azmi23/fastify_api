'use strict'
const Request = require('oauth2-server').Request
const Response = require('oauth2-server').Response
const client = require('../../models/client')
const UserController =  require('../../controllers/user')

module.exports = async function (fastify, opts) {
  
  fastify.post('/oauth/token', async (req, res) => {
    const request = new Request(req)
    const response = new Response(res)
    return fastify.oauth.token(request, response)
  })

  fastify.post('/sign_up', async (req, res) => UserController.createUser(req, res, fastify))

}
