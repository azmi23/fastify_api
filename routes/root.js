'use strict'

module.exports = async function (fastify, opts) {
  const userController = require('../controllers/user')
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/users', async (req, res) => userController.getUsers(req, res, fastify))

  fastify.get('/user/:id', async (req, res) => userController.getUserId(req, res, fastify))

  fastify.post('/user', async (req, res) => userController.postUser(req, res, fastify))

  // fastify.get('/db', async function(req, res) {
  //   try{
  //     const result = await fastify.db
  //     console.log(result)
  //     return 1
  //   }catch(err){
  //     console.log(err)
  //     return 0
  //   }
  // })
}
