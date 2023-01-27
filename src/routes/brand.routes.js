const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const brandController = require('../controllers/brand.controller');
const { createBrandSchema, updateBrandSchema, getBrandParamSchema } = require('../middleware/validators/brandValidator.middleware');

router.route('/categories/:category_id/brands')
    .get( // localhost:3000/api/API_VERSION/food/categories/1/brands
        checkValidation,
        awaitHandlerFactory(brandController.getAllBrandsByCategoryId)
    )
    .post( // localhost:3000/api/API_VERSION/food/categories/1/brands
        jwtUserAuth(Role.Admin),
        createBrandSchema,
        checkValidation,
        awaitHandlerFactory(brandController.createBrand)
    );

router.route('/categories/:category_id/brands/:id')
    .get( // localhost:3000/api/API_VERSION/categories/1/brands/2
        getBrandParamSchema,
        checkValidation,
        awaitHandlerFactory(brandController.getBrandById)
    )
    .patch( // localhost:3000/api/API_VERSION/categories/1/brands/2 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getBrandParamSchema,
        updateBrandSchema,
        checkValidation,
        awaitHandlerFactory(brandController.updateBrand)
    )
    .delete( // localhost:3000/api/API_VERSION/categories/1/brands/2
        jwtUserAuth(Role.Admin),
        getBrandParamSchema,
        checkValidation,
        awaitHandlerFactory(brandController.deleteBrand)
    );

module.exports = router;