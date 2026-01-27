const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config'); //ENV storage

app.use(cors()); //cors enables front to back end connection

//middleware
app.use(bodyParser.json()); //parse into json
app.use(morgan('tiny')); //log all API req in console

const usersRouter = require('./routers/user')
const accountsRouter = require('./routers/account')
const transactionsRouter = require('./routers/transaction')


const api = process.env.API_URL; //api variable
app.use(api+'/users', usersRouter)//routers
app.use(api+'/accounts', accountsRouter)
app.use(api+'/transactions', transactionsRouter)

//database connect
mongoose.connect(process.env.CONNECTION_STRING,{dbName: 'Ebits_Bank'})
.then(()=>{
    console.log('Database connected...')
}).catch((err)=>{
    console.log(err)
})
 
//server connect
app.listen(3000, ()=>{
    console.log('server running on http://localhost:3000');
})