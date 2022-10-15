const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {checkValidation} = require('../middleware/validation.middleware');

const userController = require('../controllers/user.controller');
const { Roles } = require('../utils/enums/roles.enum');
const { updateUserSchema, getUserParamSchema } = require('../middleware/validators/userValidator.middleware');

router.get('/',
    jwtUserAuth(Roles.Admin),
    checkValidation,
    awaitHandlerFactory(userController.getAllUsers)
); // localhost:3000/api/API_VERSION/users

router.get('/:user_id',
    jwtUserAuth(Roles.Admin),
    getUserParamSchema,
    checkValidation,
    awaitHandlerFactory(userController.getUserById)
); // localhost:3000/api/API_VERSION/users/{user_id}

router.patch('/:user_id',
    jwtUserAuth(Roles.Admin),
    getUserParamSchema,
    updateUserSchema,
    checkValidation,
    awaitHandlerFactory(userController.updateUser)
); // localhost:3000/api/API_VERSION/users/{user_id}

router.delete('/:user_id',
    jwtUserAuth(Roles.Admin),
    getUserParamSchema,
    checkValidation,
    awaitHandlerFactory(userController.deleteUser)
); // localhost:3000/api/API_VERSION/users/{user_id}

module.exports = router;