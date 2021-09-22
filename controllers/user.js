'use strict'
const users = require('../generated.json')
const userModel = require('../models/user')
module.exports = {
  postUser: async function (req, res, fastifyInstance) {
    try {
      const user = await userModel(fastifyInstance).create(req.body)
      return res.send(user)
    } catch (error) {
      // console.log(error)
      return res.send({error: error})
    }
  },
  getUsers: async function (req, res, fastifyInstance) {
    try {
      const users = await userModel(fastifyInstance).findAll()
    
      return res.send(users)
    } catch (error) {
      return error
    }
  },
  getUserId: async function (req, res, fastifyInstance) {
      try {
        const user = await userModel(fastifyInstance).findOne({
          where: {
            id: req.params.id
          }
        })
        if(user){
          return res.send(user)
        } else {
          // console.log(fastify.httpErrors)
          return fastifyInstance.httpErrors.notFound()
        }
      } catch (error) {
        return fastifyInstance.httpErrors.badRequest()
      }
    }
}