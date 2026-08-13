const express = require('express') 
const authController = require('../controllers/auth.controller')
const authRouter = express.Router() ;

const authMiddleware = require('../middlewares/auth.middleware') 

/**
 * @route POST /api/auth/register
 */
authRouter.post('/register', authController.registerUserController )

/**
 * @route POST /api/auth/login
 */
authRouter.post('/login', authController.loginUserController )

/**
 * @route POST /api/auth/logout
 */
authRouter.post('/logout', authController.logoutUserController )

/**
 * @route GET /api/auth/get-me
 */
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeController)

module.exports = authRouter ;
