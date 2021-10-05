'use strict'
const { default: fp } = require("fastify-plugin");
const OAuth2Server = require('oauth2-server');
const argon2 = require("argon2");

module.exports = fp(async function(fastify, opts) {
  const models = fastify.modelsDb
  const model = {
    getAccessToken: async function(accessToken){
      try {
        const token = await models.token.findOne({
          where: {
            access_token: accessToken
          }
        })
        if(token){
          return {
            refreshToken: token.refresh_token,
            refreshTokenExpiresAt: token.expires_at,
            client: {
              id: token.client_id
            }, 
            user: {
              id: token.user_id
            }
          }
        } else {
          return null
        }
      } catch (error) {
        return null
      }
    },
    getRefreshToken: async function (refresh_token){
      try {
        const refreshToken = await models.refresh_token.findOne({
          where: {
            refresh_token: refresh_token
          }
        })
        if (refreshToken) {
          return {
            refreshToken: refreshToken.refresh_token,
            refreshTokenExpiresAt: refreshToken.expires_at,
            client: {
              id: refreshToken.client_id
            }, 
            user: {
              id: refreshToken.user_id
            }
          }
        } else return null
      } catch (error) {
        console.log(error)
        return null
      }
    },
    getAuthorizationCode: async function (authorizatonCode) {
      try {
        const code = await models.authorizaton.findOne({
          where: {
            authorizaton_code: authorizatonCode
          }
        })
        if(code){
          return code
        } else {
          return null
        }
      } catch (error) {
        return null
      }
    },
    getClient: async function (client_id, client_secret) {
      const params = {
        client_id: client_id
      }
      if (client_secret) {
        params.client_secret = client_secret
      }
      try {
        const client = await models.client.findOne({
          where: {
            client_id: params.client_id
          }
        })
        if(client) {
          return {
            id: client.client_id,
            redirectUris: client.data_uris,
            grants: ['authorization_code', 'refresh_token', 'password']
          }
        } else {
          return null
        }
      } catch (error) {
        console.log(error)
        return null
      }
    },
    getUser: async function (username, password) {
      try {
        const user = await models.user.findOne({
          where: {
            email: username
          }
        })
        if(user){
          const checkPassword = await argon2.verify(user.password, password)
          if( checkPassword){
            return user
          } else {
            return null
          }
        } else {
          return null
        }
      } catch (error) {
        console.log(error)
        return null
      }
    },
    saveToken: async function (_token, _client, _user) {
      try {
        const _accessToken = await models.token.create({
          access_token: _token.accessToken,
          expires_at: _token.accessTokenExpiresAt,
          client_id: _client.id,
          user_id: _user.id
        })
        if (_accessToken) {
          const _refreshToken = await models.refresh_token.create({
            refresh_token: _token.refreshToken,
            expires_at: _token.refreshTokenExpiresAt,
            client_id: _client.id,
            user_id: _user.id
          })
          if (_refreshToken) {
            const token = {
              accessToken: _accessToken.access_token,
              accessTokenExpiresAt: _accessToken.expires_at,
              refreshToken: _refreshToken.refresh_token,
              refreshTokenExpiresAt: _refreshToken.expires_at,
              scope: _token.scope,
              client: {id: _accessToken.client_id},
              user: {id: _accessToken.user_id}
            }
            return token
          } else return null
        } else return null
      } catch (error) {
        console.log(error)
        return null
      }
    },
    revokeToken: async function (_token) {
      try {
        const client = await models.client.findOne({
          where: {
            client_id: _token.client.id
          }
        })
        if (!client) {
          return false
        }
        const accessToken = await models.token.destroy({
          where: {
            client_id: client.client_id
          }
        })
        const refreshToken = await models.refresh_token.destroy({
          where: {
            refresh_token: _token.refreshToken
          }
        })
        if (refreshToken && accessToken) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    },
    revokeAuthorizationCode: async function(code) {
      try {
        const authorizationCode = await models.authorization.destroy({
          where: {
            authorizaton_code: code
          }
        })
        if (authorizationCode) {
          return true
        } else return false
      } catch (error) {
        return false
      }
    }
  }
  const oauth = new OAuth2Server({
    model: model,
    allowBearerTokensInQueryString: true,
    accessTokenLifetime: 4 * 60 * 60
  });

  fastify.register(require('fastify-formbody'))

  fastify.decorate('oauth', oauth)
})