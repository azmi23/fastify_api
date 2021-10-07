'use strict'
const users = require('../generated.json')
// const userModel = require('../models/user')
const argon2 = require('argon2')
module.exports = {
  
  createUser: async function (req, res, ctx) {
    const body = req.body
    const models = ctx.modelsDb
    try {
      const hash = await argon2.hash(body.password)
      const user = await models.user.create({
        email: body.email,
        password: hash,
        gender: body.gender,
        firstName: body.firstName,
        lastName: body.lastName,
        birthDay: body.birthDay
      })
      return res.send(user)
    } catch (error) {
      console.log(error)
      return ctx.httpErrors.badRequest()
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