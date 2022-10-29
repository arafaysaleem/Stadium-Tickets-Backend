const { param } = require('express-validator');

exports.getBookingSeatParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Booking seat id must be an integer >= 1')
];