const { param } = require('express-validator');

exports.getBookingParkingSpaceParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Booking parking space id must be an integer >= 1')
];