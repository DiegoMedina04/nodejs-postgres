const boom = require('@hapi/boom');
const {models} = require('./../libs/sequelize')

class userServices {

  async findUser(){

    try {

    const userFindAll = await models.User.findAll({attributes:{exclude:['password']}})
    if(!userFindAll){
      return boom.notFound()
    }
    return userFindAll

    } catch (error) {
      return boom.notFound(error)
    }

  }

  async findById(id){
    try {
      const userId = await models.User.findByPk(id,{attributes:{exclude:['password']}})
      if(!userId){
        return boom.notFound()
      }
      return userId
    } catch (error) {
      return boom.notFound(error)
    }
  }

  async findByEmail(email){
   try {

    const user =await models.User.findOne({
      where: {email}
    })
    return user

   } catch (error) {
    return boom.notFound(error)
   }
  }

  async createUser(body){

    try {

      const newUser = await models.User.create(body)
      delete newUser.dataValues.password
      return newUser

    } catch (error) {
      return boom.notAcceptable(error)
    }
  }

  async updateUser(id, changes){
    try {
      const userUpdate = await this.findById(id)
      return await userUpdate.update(changes)

    } catch (error) {
      return boom.notFound(error)
    }
  }
  async deleteUser(id){
    try {
      const userDelete = await this.findById(id)
      userDelete.destroy()
      return 'Usuario eliminado'
    } catch (error) {
      return boom.notFound(error)
    }
  }
}


module.exports= userServices
