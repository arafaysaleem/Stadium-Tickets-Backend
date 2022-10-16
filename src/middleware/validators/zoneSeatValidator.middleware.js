const { body, param } = require('express-validator');
const { SeatTypes } = require('../../utils/enums/seatTypes.enum');

exports.createZoneSeatSchema = [
    body('seat_number')
        .exists()
        .withMessage('Seat number is required for each seat')
        .bail()
        .isInt()
        .withMessage('Should be an integer'),
    body('seat_row')
        .trim()
        .exists()
        .withMessage('Seat row is required for each seat')
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
        .withMessage('Type is required for each seat')
        .bail()
        .isIn([...Object.values(SeatTypes)])
        .withMessage('Invalid seat type')
];

exports.updateZoneSeatSchema = [
    body('seat_number')
        .optional()
        .isInt()
        .withMessage('Should be an integer'),
    body('seat_row')
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
        .isIn([...Object.values(SeatTypes)])
        .withMessage('Invalid seat type'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['seat_number', 'seat_row', 'type'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getZoneSeatParamSchema = [
    param('zone_id')
        .exists()
        .withMessage('Zone id is required for the endpoint')
        .isInt({ min: 1 })
        .withMessage('Zone id must be an integer >= 1'),
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Zone seat id must be an integer >= 1')
];