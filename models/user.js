'user strict'
const {DataTypes, Model} = require('sequelize')

// module.exports = fp(async function (fastify, opts){
//   const {DataTypes} = fastify.db
//   const User = fastify.db.define('User', {
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING
//       // allowNull defaults to true
//     }
//   })
// })

module.exports = (fastify) => {
  try {
    const user = fastify.db.define('User', {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      fullName: {
        type: DataTypes.STRING
      }
    })
    return user
  } catch (error) {
    return error
  }
  
}

// class User extends Model{}

// User.init({
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   },
//   fullName: {
//     type: DataTypes.STRING
//   }, {
    
//   }
// })