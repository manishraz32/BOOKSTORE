const express = require("express");
const {
    registerController, loginController,
} = require('../controllers/auth-controller')
const authRouter = express.Router();

//routing
//REGISTER || METHOD POST
authRouter.post('/register', registerController);
authRouter.post('/login', loginController);

module.exports = authRouter;