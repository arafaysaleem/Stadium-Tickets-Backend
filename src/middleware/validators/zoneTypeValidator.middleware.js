const { body, param } = require('express-validator');

exports.createZoneTypeSchema = [
    body('type')
        .trim()
        .exists()
        .withMessage('Type name is required')
        .isLength({ min: 2 })
        .withMessage('Must be at least 3 chars long')
        .isAlpha('en-US')
        .withMessage('Type name should be all alphabets'),
    body('price')
        .trim()
        .exists()
        .withMessage('Price is required')
        .isInt({min: 1})
        .withMessage('Invalid price. Should be a whole number > 0')
];

exports.updateZoneTypeSchema = [
    body('type')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Must be at least 3 chars long')
        .isAlpha('en-US')
        .withMessage('Type name should be all alphabets'),
    body('price')
        .optional()
        .trim()
        .isInt({min: 1})
        .withMessage('Invalid price. Should be a whole number > 0'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['type', 'price'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getZoneTypeParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Zone type id must be an integer >= 1')
];