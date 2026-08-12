const express = require('express') ;

/**
 * importing all the routes here
 */
  
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');

const app = express() ;
app.use(express.json())
app.use(cookieParser())
/** 
 * using all the routes here
*/
 

app.use('/api/auth', authRouter)


module.exports = app ;