const { body, param } = require('express-validator');

exports.createBrandSchema = [
    body('name')
        .trim()
        .exists()
        .withMessage('Brand name is required')
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('logo_url')
        .trim()
        .exists()
        .withMessage('URL is required for each brand logo')
        .bail()
        .isURL()
        .withMessage('Invalid logo url found'),
    body('category_id')
        .exists()
        .withMessage('Category ID is required for the brand')
        .isInt({ min: 1 })
        .withMessage('Invalid Category ID found')
];

exports.updateBrandSchema = [
    body('logo_url')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid logo url found'),
    body('name')
        .optional()
        .trim()
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('category_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid Category ID found'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['logo_url', 'name', 'category_id'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getBrandParamSchema = [
    param('category_id')
        .exists()
        .withMessage('Category id is required for the endpoint')
        .isInt({ min: 1 })
        .withMessage('Category id must be an integer >= 1'),
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Brand id must be an integer >= 1')
];