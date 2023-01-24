const boom = require('@hapi/boom');
const  bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

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
      console.log('dara un ellor de  "Cannot set headers after they are sent to the client" ya que de alguna manera hace que se pinte de una en la respuesta y no de donde salio ')
      throw boom.unauthorized('incorrect password')

    }

    delete user.dataValues.password;
    return user
  }


   signToken(user){

    try {
    const payload={
      sub:user.id,
      role:user.role
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '1m'})
    return token
    } catch (error) {
      return error
    }
  }


  async sendRecovery(email){


    const user = await services.findByEmail(email)
    if(!user){
       throw boom.unauthorized()
    }

    const payload ={sub: user.id}
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;

    await services.updateUser(user.id, {recoveryToken: token})
    const infoEmail={
      from:  'diegoprada005@gmail.com',
      to:  user.email,
      subject: "Recuperar contraseña ✔",
      html: `<b>Ingresa a este link => ${link}</b>`,

    }

    const rta = await this.sendEmail(infoEmail, token)
    return rta
  }

  async sendEmail(infoEmail, token){

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure:true,
      port: 465,
      auth: {
          user: 'diegoprada005@gmail.com',
          pass: 'ssedoibulnrwnpdg'
      }
    });


    await transporter.sendMail(infoEmail);


    return {message: 'email send', token}

  }


  async changePassword(token, newPassword){
    try {
      const payload =jwt.verify(token, config.jwtSecret)
      const user = await services.findById(payload.sub)

      if(user.recoveryToken !==token){
        return boom.unauthorized('vuelve a intentarlo')
      }
      const hash =await bcrypt.hash(newPassword, 10)
      await services.updateUser(user.id, {recoveryToken: null, password: hash})

      return 'change password'
    } catch (error) {
      return boom.unauthorized(error)
    }
  }

}

module.exports= authServices
