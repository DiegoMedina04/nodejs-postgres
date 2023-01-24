const { ValidationError } = require("sequelize");

function errorLengs(err, req, res, next){

  next(err);

  //lo captura y muestra en consola
}

function errorHandle(err, req, res, next){


  res.status(500).json({
    message: err.message,
    stack: err.stack
  })

  //acaba la peticion y deulve en formato json
}


function boomErrorHandle(err, req, res, next){
  if(err.isBoom){

    const {output}= err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err)

  //acaba la peticion y deulve en formato json
}

function ormErrorHandler (err, req, res, next){
  if(err instanceof ValidationError){//para detectar si el error viene de sequelice
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    })
  }
  next(err)
}


module.exports={errorLengs, errorHandle, boomErrorHandle, ormErrorHandler}


