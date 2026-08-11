require('dotenv').config() ;
const connectToDB = require('./src/config/databse');
const app = require("./src/app");

connectToDB()


app.listen(3000,  ()=>{
    console.log('Server is running....')
})