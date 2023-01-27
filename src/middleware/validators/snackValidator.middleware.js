const { body, param } = require('express-validator');

exports.createSnackSchema = [
    body('name')
        .trim()
        .exists()
        .withMessage('Snack name is required')
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('image_url')
        .trim()
        .exists()
        .withMessage('URL is required for each snack logo')
        .bail()
        .isURL()
        .withMessage('Invalid logo url found'),
    body('brand_id')
        .exists()
        .withMessage('Brand ID is required for the snack')
        .isInt({ min: 1 })
        .withMessage('Invalid Brand ID found'),
    body('price')
        .trim()
        .exists()
        .withMessage('Price is required')
        .isInt({min: 1})
        .withMessage('Invalid price. Should be a whole number > 0')
];

exports.updateSnackSchema = [
    body('image_url')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid logo url found'),
    body('price')
        .optional()
        .trim()
        .isInt({min: 1})
        .withMessage('Invalid price. Should be a whole number > 0'),
    body('name')
        .optional()
        .trim()
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('brand_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid Brand ID found'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['image_url', 'name', 'brand_id', 'price'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getSnackParamSchema = [
    param('brand_id')
        .exists()
        .withMessage('Brand id is required for the endpoint')
        .isInt({ min: 1 })
        .withMessage('Brand id must be an integer >= 1'),
    param('category_id')
        .exists()
        .withMessage('Category id is required for the endpoint')
        .isInt({ min: 1 })
        .withMessage('Category id must be an integer >= 1'),
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Snack id must be an integer >= 1')
];