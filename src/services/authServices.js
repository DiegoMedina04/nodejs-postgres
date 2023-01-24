const boom = require('@hapi/boom');
const  bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {config}= require('./../config/config')

const userServices = require('./userServices')
const services = new userServices()

class authServices {

  async getUser(email, password){
    const user = await  services.findByEmail(email)

    if(!user){
      return boom.unauthorized()
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return boom.unauthorized('incorrect password')
    }

    delete user.dataValues.password;
    return user
  }


   signToken(user){

    const payload={
      sub:user.id,
      role:user.role
    }

    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '1m'})
    return token
  }
}

module.exports= authServices
