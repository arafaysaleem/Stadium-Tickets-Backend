const express = require('express');
const router = express.Router();
const { JwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {checkValidation} = require('../middleware/validation.middleware');

const userController = require('../controllers/user.controller');
const { Roles } = require('../utils/enums/roles.enum');
const { updateUserSchema } = require('../middleware/validators/userValidator.middleware');

router.get('/',
    JwtUserAuth(Roles.Admin),
    checkValidation,
    awaitHandlerFactory(userController.getAllUsers)
); // localhost:3000/api/API_VERSION/users

router.get('/:user_id',
    JwtUserAuth(Roles.Admin),
    awaitHandlerFactory(userController.getUserById)
); // localhost:3000/api/API_VERSION/users/{user_id}

router.patch('/:user_id',
    JwtUserAuth(Roles.Admin),
    updateUserSchema,
    checkValidation,
    awaitHandlerFactory(userController.updateUser)
); // localhost:3000/api/API_VERSION/users/{user_id}

router.delete('/:user_id',
    JwtUserAuth(Roles.Admin),
    awaitHandlerFactory(userController.deleteUser)
); // localhost:3000/api/API_VERSION/users/{user_id}

module.exports = router;