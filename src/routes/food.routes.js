const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const categoryController = require('../controllers/category.controller');
const { createCategorySchema, updateCategorySchema, getCategoryParamSchema } = require('../middleware/validators/categoryValidator.middleware');

const brandController = require('../controllers/brand.controller');
const { createBrandSchema, updateBrandSchema, getBrandParamSchema } = require('../middleware/validators/brandValidator.middleware');

const snackController = require('../controllers/snack.controller');
const { createSnackSchema, updateSnackSchema, getSnackParamSchema } = require('../middleware/validators/snackValidator.middleware');

router.route('/food/categories')
    .get( // localhost:3000/api/API_VERSION/food/categories
        checkValidation,
        awaitHandlerFactory(categoryController.getAllCategories)
    )
    .post( // localhost:3000/api/API_VERSION/food/categories
        jwtUserAuth(Role.Admin),
        createCategorySchema,
        checkValidation,
        awaitHandlerFactory(categoryController.createCategory)
    );

router.route('/categories/:id')
    .get( // localhost:3000/api/API_VERSION/categories/1
        getCategoryParamSchema,
        checkValidation,
        awaitHandlerFactory(categoryController.getCategoryById)
    )
    .patch( // localhost:3000/api/API_VERSION/categories/1 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getCategoryParamSchema,
        updateCategorySchema,
        checkValidation,
        awaitHandlerFactory(categoryController.updateCategory)
    )
    .delete( // localhost:3000/api/API_VERSION/categories/1
        jwtUserAuth(Role.Admin),
        getCategoryParamSchema,
        checkValidation,
        awaitHandlerFactory(categoryController.deleteCategory)
    );
    
router.route('/food/categories/:category_id/brands')
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

router.route('/food/categories/:category_id/brands/:id')
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

router.route('/food/categories/:category_id/brands/:brand_id/snacks')
    .get( // localhost:3000/api/API_VERSION/food/categories/1/brands/:brand_id/snacks
        checkValidation,
        awaitHandlerFactory(snackController.getAllSnacksByBrandId)
    )
    .post( // localhost:3000/api/API_VERSION/food/categories/1/brands/:brand_id/snacks
        jwtUserAuth(Role.Admin),
        createSnackSchema,
        checkValidation,
        awaitHandlerFactory(snackController.createSnack)
    );

router.route('/food/categories/:category_id/brands/:brand_id/snacks/:id')
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