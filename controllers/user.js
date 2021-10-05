'use strict'
const users = require('../generated.json')
// const userModel = require('../models/user')
const argon2 = require('argon2')
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
  },
  isYou: async function (req, res, ctx){
    const body = req.body
    try {
      const user = await userModel(ctx).findOne({
        where: {
          email: body.email,
        }
      })
      if(user) {
        const checkPassword = await argon2.verify(user.password, body.password)
        if(checkPassword){
          return res.send({
            message: 'welcome ' + user.email
          })
        } else {
          return res.send({
            message: 'Password Salah'
          })
        }
      } else {
        return ctx.httpErrors.notFound()
      }

    } catch (error) {
      
    }
  },
  createUser: async function (req, res, ctx) {
    const body = req.body
    const models = ctx.modelsDb
    try {
      const hash = await argon2.hash(body.password)
      const user = await models.user.create({
        email: body.email,
        password: hash
      })
      return res.send(user)
    } catch (error) {
      console.log(error)
      return ctx.httpErrors.badRequest()
    }
  }
  
}