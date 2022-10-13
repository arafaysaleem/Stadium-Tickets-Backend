const { body, query } = require('express-validator');
const { ResourceTypes } = require('../../utils/enums/resourceType.enum');
const { SeatTypes } = require('../../utils/enums/seatTypes.enum');

exports.createZoneSchema = [
    body('name')
        .trim()
        .exists()
        .withMessage('Zone name is required')
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('seats_per_row')
        .trim()
        .exists()
        .withMessage('Max number of seats for the longest row is required')
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('num_of_rows')
        .trim()
        .exists()
        .withMessage('Total number of seat rows is required')
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('color_hex_code')
        .trim()
        .exists()
        .withMessage('Zone color is required')
        .isHexColor({ length: 7 })
        .withMessage('Should be a 7-digit hex code'),
    body('z_type_id')
        .exists()
        .withMessage('Zone type ID is required for the resource')
        .isInt({ min: 1 })
        .withMessage('Invalid Zone type ID found'),
    body('resources')
        .optional()
        .isArray()
        .withMessage('Resources must be an array like [{resource_url : "www.some-media.com", type: \'image\'},{...}]')
        .bail(),
    body('resources.*.resource_url')
        .trim()
        .exists()
        .withMessage('URL is required for each resource')
        .bail()
        .isURL()
        .withMessage('Invalid resource url found'),
    body('resources.*.type')
        .trim()
        .exists()
        .withMessage('Resource type is required for each resource')
        .bail()
        .isIn([...Object.values(ResourceTypes)])
        .withMessage('Invalid Resource type'),
    body('seats')
        .optional()
        .isArray()
        .withMessage('Blocked\\Missing seats must be an array like [{seat_number : 1, seat_row: \'A\', type: \'missing\'\\\'blocked\'},{...}]')
        .bail()
        .notEmpty()
        .withMessage('Blocked\\Missing can\'t be empty'),
    body('seats.*.seat_number')
        .trim()
        .exists()
        .withMessage('Seat number is required for each seat')
        .bail()
        .isInt()
        .withMessage('Should be an integer'),
    body('seats.*.seat_row')
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
    body('seats.*.type')
        .trim()
        .exists()
        .withMessage('Seat type is required for each seat')
        .bail()
        .isIn([...Object.values(SeatTypes)])
        .withMessage('Invalid Seat type')
];

exports.updateZoneSchema = [
    body('name')
        .optional()
        .trim()
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body('seats_per_row')
        .optional()
        .trim()
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('num_of_rows')
        .optional()
        .trim()
        .isInt({min: 1})
        .withMessage('Should be a whole number >= 1'),
    body('color_hex_code')
        .optional()
        .trim()
        .isHexColor({ length: 7 })
        .withMessage('Should be a 7-digit hex code'),
    body('z_type_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid Zone type ID found'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name', 'seats_per_row', 'num_of_rows', 'color_hex_code', 'z_type_id'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getZonesQuerySchema = [
    query('z_type_id')
        .optional()
        .trim()
        .isInt({ min: 1 })
        .withMessage('Invalid Zone type ID found'),
    query()
        .custom(value => {
            const queryParams = Object.keys(value);
            const allowParams = ['z_type_id'];
            return queryParams.every(param => allowParams.includes(param));
        })
        .withMessage('Invalid query params!')
];