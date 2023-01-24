const { Strategy } = require('passport-local');


const authServices = require('../../../services/authServices')
const services = new authServices()

const localStrategy = new Strategy( {
  usernameField: 'email',
  passwordField: 'password'
  },async (email, password, done )=>{

    try {
      const user = await services.getUser(email, password)

      done(null, user)

    } catch (error) {
      done(error, false)
    }
})

module.exports =localStrategy
