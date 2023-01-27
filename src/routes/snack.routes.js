const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const snackController = require('../controllers/snack.controller');
const { createSnackSchema, updateSnackSchema, getSnackParamSchema } = require('../middleware/validators/snackValidator.middleware');

router.route('/categories/:category_id/brands/:brand_id/snacks')
    .get( // localhost:3000/api/API_VERSION/food/categories/1/brands/2/snacks
        getSnackParamSchema,
        checkValidation,
        awaitHandlerFactory(snackController.getAllSnacksByBrandId)
    )
    .post( // localhost:3000/api/API_VERSION/food/categories/1/brands/2/snacks
        jwtUserAuth(Role.Admin),
        getSnackParamSchema,
        createSnackSchema,
        checkValidation,
        awaitHandlerFactory(snackController.createSnack)
    );

router.route('/categories/:category_id/brands/:brand_id/snacks/:id')
    .get( // localhost:3000/api/API_VERSION/categories/1/brands/2/snacks/1
        getSnackParamSchema,
        checkValidation,
        awaitHandlerFactory(snackController.getSnackById)
    )
    .patch( // localhost:3000/api/API_VERSION/categories/1/brands/2/snacks/1 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getSnackParamSchema,
        updateSnackSchema,
        checkValidation,
        awaitHandlerFactory(snackController.updateSnack)
    )
    .delete( // localhost:3000/api/API_VERSION/categories/1/brands/2/snacks/1
        jwtUserAuth(Role.Admin),
        getSnackParamSchema,
        checkValidation,
        awaitHandlerFactory(snackController.deleteSnack)
    );

module.exports = router;