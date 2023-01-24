const passport= require('passport')
const express = require('express')
const router = express.Router()

const userServices = require('./../services/userServices')
const services =new userServices()

const {validatorHandle}= require('./../middlewares/validatorHandler')
const {createUserSchema, updateUserSchema, getUserSchame } = require('../schemas/usersSchemas')


router.get('/',
  passport.authenticate('jwt', {session:false}),
  async (req, res)=>{

  try {

    const userFindAll = await services.findUser()
    res.json(userFindAll)

  } catch (error) {
    return error
  }
})

router.get('/:id',
  validatorHandle(getUserSchame, 'params'),
  async(req, res) => {
  try {

    const {id} = req.params

    const userId= await services.findById(id)
    res.json(userId)
  } catch (error) {
    res.json(error)
  }

})

router.post('/createUser',
  validatorHandle(createUserSchema, 'body'),
  async (req,res, next) => {
  try {
    const {body}= req
    const newUser = await services.createUser(body)
    res.json(newUser);

  } catch (error) {
    next(error)
  }

})

router.patch('/updateUser/:id',

    validatorHandle(getUserSchame, 'params'),
    validatorHandle(updateUserSchema, 'body'),
    async(req, res)=> {
    try {

      const {id} = req.params
      const changes = req.body

      const userUpdate = await services.updateUser(id, changes)
      res.json(userUpdate)
    } catch (error) {
      res.json(error)
    }
})


router.delete('/deleteUser/:id',
  validatorHandle(getUserSchame, 'params'),
  async(req, res)=>{
  try {
    const {id} = req.params

    const deleteUser = await services.deleteUser(id)
    res.send(deleteUser)
  } catch (error) {
    res.json(error)
  }
})

module.exports= router

