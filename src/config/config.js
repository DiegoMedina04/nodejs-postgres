require('dotenv').config();


const config ={
  uriDb: process.env.URI_DB,
  jwtSecret: process.env.SECRET
}

module.exports={config}
