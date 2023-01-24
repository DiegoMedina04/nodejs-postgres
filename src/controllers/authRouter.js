const passport= require('passport')

const userServices = require('./../services/authServices')
const services = new userServices()
const express = require('express')
const router = express.Router()


router.post('/login',
  passport.authenticate('local', {session:false}),
  async(req, res)=>{

    const user = req.user
    const token = await services.signToken(user)

    res.json({user, token })

})

module.exports = router
