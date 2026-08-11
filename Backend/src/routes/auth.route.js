const express = require('express') 
const authController = require('../controllers/auth.controller')
const authRouter = express.Router() ;

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController )

/**
 * @route POST /api/auth/login
 * @description Registered users can login 
 * @access Public
 */
authRouter.post('/login', authController.loginUserController )

/**
 * @route POST /api/auth/logout
 * @description Clear token and add it to blacklist 
 * @access Public (or Protected)
 */

authRouter.post('/logout', authController.logoutUserController )

module.exports = authRouter ;
