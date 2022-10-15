const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {checkValidation} = require('../middleware/validation.middleware');

const userController = require('../controllers/user.controller');
const { Roles } = require('../utils/enums/roles.enum');
const { updateUserSchema, getUserParamSchema } = require('../middleware/validators/userValidator.middleware');

router.route('/users')
    .get( // localhost:3000/api/API_VERSION/users
        jwtUserAuth(Roles.Admin),
        checkValidation,
        awaitHandlerFactory(userController.getAllUsers)
    );

router.route('/users/:id')
    .get( // localhost:3000/api/API_VERSION/users/1
        jwtUserAuth(Roles.Admin),
        getUserParamSchema,
        checkValidation,
        awaitHandlerFactory(userController.getUserById)
    )
    .patch( // localhost:3000/api/API_VERSION/users/1
        jwtUserAuth(Roles.Admin),
        getUserParamSchema,
        updateUserSchema,
        checkValidation,
        awaitHandlerFactory(userController.updateUser)
    )
    .delete( // localhost:3000/api/API_VERSION/users/1
        jwtUserAuth(Roles.Admin),
        getUserParamSchema,
        checkValidation,
        awaitHandlerFactory(userController.deleteUser)
    );

module.exports = router;