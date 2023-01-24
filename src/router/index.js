
const userController = require('../controllers/userController')
const authRouter = require('../controllers/authRouter')
const express = require('express');

function routerApi(app){

  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', userController)
  router.use('/auth', authRouter)


}

module.exports= routerApi
