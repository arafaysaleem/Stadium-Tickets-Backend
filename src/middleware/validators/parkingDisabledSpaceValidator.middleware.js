const { body, param } = require('express-validator');
const { DisabledSpaceType } = require('../../utils/enums/disabledSpaceType.enum');

exports.createParkingDisabledSpaceSchema = [
    body('space_number')
        .exists()
        .withMessage('Space number is required for each space')
        .bail()
        .isInt()
        .withMessage('Should be an integer'),
    body('space_row')
        .trim()
        .exists()
        .withMessage('Space row is required for each space')
        .bail()
        .isLength({min: 1, max: 1})
        .withMessage('Must be a single character')
        .bail()
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('type')
        .trim()
        .exists()
        .withMessage('Type is required for each space')
        .bail()
        .isIn([...Object.values(DisabledSpaceType)])
        .withMessage('Invalid space type')
];

exports.updateParkingDisabledSpaceSchema = [
    body('space_number')
        .optional()
        .isInt()
        .withMessage('Should be an integer'),
    body('space_row')
        .optional()
        .trim()
        .isLength({min: 1, max: 1})
        .withMessage('Must be a single character')
        .bail()
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('type')
        .optional()
        .trim()
        .isIn([...Object.values(DisabledSpaceType)])
        .withMessage('Invalid space type'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['space_number', 'space_row', 'type'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getParkingDisabledSpaceParamSchema = [
    param('p_floor_id')
        .exists()
        .withMessage('Parking floor id is required for the endpoint')
        .isInt({ min: 1 })
        .withMessage('Parking floor id must be an integer >= 1'),
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Parking disabled space id must be an integer >= 1')
];