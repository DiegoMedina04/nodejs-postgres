const passport= require('passport')

const userServices = require('./../services/authServices')
const services = new userServices()
const express = require('express')
const router = express.Router()


router.post('/login',
  passport.authenticate('local', {session:false}),
  async(req, res)=>{

    try {
      const user = req.user
      const token = await services.signToken(user)
      res.json({user, token })

    } catch (error) {
      res.json(error)
    }

})
router.post('/recovery',

  async(req, res)=>{

    const {email} = req.body
    const rta = await services.sendRecovery(email)

    res.json(rta)

})


router.post('/change-password',
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await services.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router
