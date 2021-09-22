'use strict'

const { default: fp } = require("fastify-plugin")

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('fastify-cors'), {
    origin: ["http://localhost", "http://localhost:3120"],
    methods: ["GET","POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  })
}) 