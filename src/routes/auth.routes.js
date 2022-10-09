const express = require('express');
const router = express.Router();
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {checkValidation} = require('../middleware/validation.middleware');

const authController = require('../controllers/auth.controller');
const { createUserSchema } = require('../middleware/validators/userValidator.middleware');
const {
    validateLogin,
    changePWSchema,
    validateRefresh
} = require('../middleware/validators/authValidator.middleware');

router.post('/register',
    createUserSchema,
    checkValidation,
    awaitHandlerFactory(authController.register)
); // localhost:3000/api/API_VERSION/auth/register

router.post('/login',
    validateLogin,
    checkValidation,
    awaitHandlerFactory(authController.login)
); // localhost:3000/api/API_VERSION/auth/login

router.post('/refresh-token',
    validateRefresh,
    checkValidation,
    awaitHandlerFactory(authController.refreshToken)
); // localhost:3000/api/API_VERSION/auth/refresh-token

// For changing password from the profile page, in case old password is known
router.patch('/change-password',
    changePWSchema,
    checkValidation,
    awaitHandlerFactory(authController.changePassword)
); // localhost:3000/api/API_VERSION/auth/password/change-password


module.exports = router;