const { body, param } = require('express-validator');

exports.createCategorySchema = [
    body('name')
        .trim()
        .exists()
        .withMessage('Category name is required')
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic')
];

exports.updateCategorySchema = [
    body('name')
        .optional()
        .trim()
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getCategoryParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Category id must be an integer >= 1')
];