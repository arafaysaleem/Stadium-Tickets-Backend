const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const categoryController = require('../controllers/category.controller');
const { createCategorySchema, updateCategorySchema, getCategoryParamSchema } = require('../middleware/validators/categoryValidator.middleware');

router.route('/categories')
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
    .get( // localhost:3000/api/API_VERSION/food/categories/1
        getCategoryParamSchema,
        checkValidation,
        awaitHandlerFactory(categoryController.getCategoryById)
    )
    .patch( // localhost:3000/api/API_VERSION/food/categories/1 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getCategoryParamSchema,
        updateCategorySchema,
        checkValidation,
        awaitHandlerFactory(categoryController.updateCategory)
    )
    .delete( // localhost:3000/api/API_VERSION/food/categories/1
        jwtUserAuth(Role.Admin),
        getCategoryParamSchema,
        checkValidation,
        awaitHandlerFactory(categoryController.deleteCategory)
    );

module.exports = router;