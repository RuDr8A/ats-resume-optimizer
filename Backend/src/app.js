const express = require('express') ;

/**
 * importing all the routes here
 */
  
const authRouter = require('./routes/auth.route');

const app = express() ;
app.use(express.json())

/** 
 * using all the routes here
*/
 

app.use('api/auth', authRouter)


module.exports = app ;