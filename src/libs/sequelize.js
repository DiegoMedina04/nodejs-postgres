const {Sequelize}= require('sequelize')

const setupModels = require('./../db/index')
const {config}= require('./../../src/config/config')

const URI = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect :  'postgres',          
  loggin:true
})
setupModels(sequelize)
sequelize.sync()

module.exports = sequelize
