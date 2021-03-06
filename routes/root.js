'use strict'
const Request = require('oauth2-server').Request
const Response = require('oauth2-server').Response
const userController = require('../controllers/user')
const {user} = require('../models')

module.exports = async function (fastify, opts) {
  fastify.addHook('onRequest', async (req, res) => {
    const result = await fastify.oauth.authenticate(new Request(req), new Response(res))
    if (result) {
      return result
    } else return fastify.httpErrors.unauthorized()
  })

  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/users', async (req, res) => userController.getUsers(req, res, fastify))

  fastify.get('/user/:id', async (req, res) => userController.getUserId(req, res, fastify))

  fastify.post('/user', async (req, res) => userController.postUser(req, res, fastify))

  fastify.post('/add_user', async (req, res) => userController.createUser(req, res, fastify))

  fastify.post('/login', async (req, res) => userController.isYou(req, res, fastify))
}
