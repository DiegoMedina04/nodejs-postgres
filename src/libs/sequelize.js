const {Sequelize}= require('sequelize')

const setupModels = require('./../db/index')
const {config}= require('./../../src/config/config')

const URI = config.uriDb;

const sequelize = new Sequelize(URI, {
  dialect :  'postgres',          //'postgres', //base de datos a la que se va a conectar
  loggin:true
})
setupModels(sequelize)
sequelize.sync()

module.exports = sequelize
