require('dotenv').config();


const config ={
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER || 'diego',
  dbPassword:  process.env.DB_PASSWORD || 'admin123',
  dbHost:  process.env.DB_HOST || 'localhost',
  dbName:  process.env.DB_NAME|| 'store',
  dbPort:  process.env.DB_PORT|| '5432',
  apiKey: process.env.API_KEY || '123456',
  jwtSecret: process.env.SECRET || 'holaMundo'
}

module.exports={config}
