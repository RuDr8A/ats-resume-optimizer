const express = require('express') 
const authController = require('../controllers/auth.controller')
const authRouter = express.Router() ;
const authMiddleware = require('../middlerwares/auth.middleware')
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
 * @access Public 
 */

authRouter.post('/logout', authController.logoutUserController )

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */

authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController)

module.exports = authRouter ;
