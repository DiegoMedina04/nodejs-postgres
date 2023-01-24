const express = require('express')
const cors = require('cors');

const routerApi = require('./src/router/index')
const {errorLengs, errorHandle, boomErrorHandle, ormErrorHandler}= require('./src/middlewares/errorHandle')


const app = express()
app.use(cors());
app.use(express.json())

require('./src/utils/auth/index')

app.get('/', (req, res)=>{
  res.send('Hello word');
})
routerApi(app)

app.use(errorLengs)
app.use(ormErrorHandler)
app.use(boomErrorHandle)
app.use(errorHandle)

app.listen(3000)
