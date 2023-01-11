const { body, param } = require('express-validator');
const { DisabledSpaceType } = require('../../utils/enums/disabledSpaceType.enum');

exports.createParkingFloorSchema = [
    body('floor_number')
        .exists()
        .withMessage('Floor number is required')
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('spaces_per_row')
        .exists()
        .withMessage('Max number of spaces for the "longest" row is required')
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('num_of_rows')
        .exists()
        .withMessage('Total number of space rows is required')
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('disabled_spaces')
        .optional()
        .isArray()
        .withMessage('Blocked\\Missing spaces must be an array like [{space_number : 1, space_row: \'A\', type: \'missing\'\\\'blocked\'},{...}]')
        .bail()
        .notEmpty()
        .withMessage('Blocked\\Missing can\'t be empty'),
    body('disabled_spaces.*.space_number')
        .exists()
        .withMessage('Space number is required for each space')
        .bail()
        .isInt()
        .withMessage('Should be an integer'),
    body('disabled_spaces.*.space_row')
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
    body('disabled_spaces.*.type')
        .trim()
        .exists()
        .withMessage('Space type is required for each space')
        .bail()
        .isIn([...Object.values(DisabledSpaceType)])
        .withMessage('Invalid Space type')
];

exports.updateParkingFloorSchema = [
    body('floor_number')
        .optional()
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('spaces_per_row')
        .optional()
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('num_of_rows')
        .optional()
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['floor_number', 'spaces_per_row', 'num_of_rows'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getParkingFloorParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Parking floor id must be an integer >= 1'),
    param('event_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Event id must be an integer >= 1')
];