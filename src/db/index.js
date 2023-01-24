const {User, userSchema } = require('./models/userModel')

function setupModels(sequelize){

  User.init(userSchema, User.config(sequelize))
}

module.exports= setupModels
