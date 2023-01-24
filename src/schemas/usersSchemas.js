const Joi = require('joi');

const id= Joi.string();
const email= Joi.string();
const password= Joi.string();
const role= Joi.string();

const createUserSchema=Joi.object({
      email: email.required(),
      password: password.required(),
      role: role.required()
})

const updateUserSchema= Joi.object({
  password:password
})

const getUserSchame= Joi.object({
  id: id.required()
})


module.exports={createUserSchema, updateUserSchema, getUserSchame};
