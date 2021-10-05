'use strict'
const authorization = require("./authorization")
const token = require("./token")
const client = require("./client")
const user = require("./user")
const refresh_token = require("./refresh_token")

module.exports = {
  sync: function (ctx, opts){
    authorization(ctx).sync(opts)
    client(ctx).sync(opts)
    token(ctx).sync(opts)
    user(ctx).sync(opts)
    refresh_token(ctx).sync(opts)
  }
}