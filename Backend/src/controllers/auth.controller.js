const userModel = require('../models/user.model')
const bscrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
/**
 * @name registerUserController
 * @description Register a new user
 * @access Public
 */
async function registerUserController(req, res){
    const {username, email, password} = req.body ;
    if(!username || !email || !password){
        return res.status(400).json({
            message : 'please provide a username, email and password'
        })
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or : [{username}, {email}]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
            message : 'Account already exits with this username or email'
        })
    }

    const hash = await bcrypt.hash(password, 10) ;
    const user  = await userModel.create({
        username,
        email,
        password
    })
    const token = jwt.sign(
        {id : user._id,username : user.username}, 
        process.env.JWT_SECRET,
        {expiresIn : '7d'}
    )
    res.cookie('token', token)

    res.status(400).json({
        message : 'user registered succesfully',
        user : {
            id : user._id,
            username : user.username,
            emai : user.email
        }
    })
}

/**
 * @name loginUserController
 * @description Register a new user
 * @access Public
 */
async function loginUserController(req, res) {
    const {email,password} = req.body ;
    if(!email || !password){
        return res.status(400).json({
            message : 'Provide email or password'
        })
    }

    const isUserRegistered = await userModel.findOne({
        email
    })
    if(isUserRegistered){
        return res.status(400).json({
            message : 'Invalid email or password'
        })
    }

    const isPasswordValid = await bscrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message : 'Invalid email or password'
        })
    }

    const token = jwt.sign(
        {id : user._id,username : user.username}, 
        process.env.JWT_SECRET,
        {expiresIn : '7d'}
    )
    res.cookie("token", token) ;
    res.status(400).json({
        message : 'user loggedIn succesfully',
        user : {
            id : user._id,
            username : user.username,
            emai : user.email
        }
    })
}



module.exports = {
    registerUserController,
    loginUserController
}