const { body, query, param } = require('express-validator');
const { BookingStatus } = require('../../utils/enums/bookingStatus.enum');
const { datetimeRegex } = require('../../utils/common.utils');
const EventBookingModel = require('../../db/models/eventBooking.model');

exports.createEventBookingSchema = [
    body('person_name')
        .trim()
        .exists()
        .withMessage('Event booking person name is required')
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('amount_payable')
        .exists()
        .withMessage('Total payable amount is required')
        .bail()
        .isDecimal({force_decimal: false, decimal_digits: '2'})
        .withMessage('Amount should be a valid decimal (0.00)')
        .isFloat({min: 0.1})
        .withMessage('Rating should be > 0.0'),
    body('datetime')
        .trim()
        .exists()
        .withMessage('Event datetime is required')
        .matches(datetimeRegex)
        .withMessage('Event datetime should be valid datetime of format \'YYYY-MM-DD HH:mm:ss\''),
    body('status')
        .trim()
        .exists()
        .withMessage('Status is required for each booking')
        .bail()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body('event_id')
        .exists()
        .withMessage('Event ID is required for the resource')
        .isInt({ min: 1 })
        .withMessage('Invalid Event ID found'),
    body('zone_id')
        .exists()
        .withMessage('Zone ID is required for the resource')
        .isInt({ min: 1 })
        .withMessage('Invalid Zone ID found'),
    body(EventBookingModel.bookingSeatsAlias)
        .exists()
        .withMessage('Booking seats are required')
        .bail()
        .isArray()
        .withMessage('Booking seats must be an array like [{seat_number: 1, seat_row: "A", person_name: "John Doe", identification_number: \'12345678912345\'},{...}]')
        .bail(),
    body(`${EventBookingModel.bookingSeatsAlias}.*.person_name`)
        .trim()
        .exists()
        .withMessage('Person name is required for each booked seat')
        .bail()
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body(`${EventBookingModel.bookingSeatsAlias}.*.seat_number`)
        .exists()
        .withMessage('Seat number is required for each seat')
        .bail()
        .isInt()
        .withMessage('Should be an integer'),
    body(`${EventBookingModel.bookingSeatsAlias}.*.seat_row`)
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
    body(`${EventBookingModel.bookingSeatsAlias}.*.identification_number`)
        .trim()
        .exists()
        .withMessage('Person ID is required for each seat')
        .bail()
        .isAlphanumeric('en-US', { length: 14 })
        .withMessage('Invalid Person ID format'),
    body(EventBookingModel.bookingParkingSpacesAlias)
        .optional()
        .isArray()
        .withMessage('Booking parking spaces must be an array like [{space_number: 1, space_row: "A", p_floor_id: 1},{...}]')
        .bail(),
    body(`${EventBookingModel.bookingParkingSpacesAlias}.*.space_number`)
        .exists()
        .withMessage('Space number is required for each parking')
        .bail()
        .isInt()
        .withMessage('Should be an integer'),
    body(`${EventBookingModel.bookingParkingSpacesAlias}.*.space_row`)
        .trim()
        .exists()
        .withMessage('Space row is required for each parking')
        .bail()
        .isLength({min: 1, max: 1})
        .withMessage('Must be a single character')
        .bail()
        .isAlpha()
        .withMessage('Must be alphabetic')
        .toUpperCase(),
    body(`${EventBookingModel.bookingParkingSpacesAlias}.*.p_floor_id`)
        .trim()
        .exists()
        .withMessage('Parking floor ID is required for each parking')
        .bail()
        .isInt({ min: 1 })
        .withMessage('Invalid Parking Floor ID found')
];

exports.updateEventBookingSchema = [
    body('person_name')
        .optional()
        .trim()
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('status')
        .optional()
        .trim()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['person_name', 'status'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getEventBookingsQuerySchema = [
    query('event_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid Event ID found'),
    query('zone_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid Zone ID found'),
    query('status')
        .optional()
        .trim()
        .isIn([...Object.values(BookingStatus)])
        .withMessage('Invalid booking status'),
    query()
        .custom(value => {
            const queryParams = Object.keys(value);
            const allowParams = ['event_id', 'zone_id', 'status'];
            return queryParams.every(param => allowParams.includes(param));
        })
        .withMessage('Invalid query params!')
];

exports.getEventBookingParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Event booking id must be an integer >= 1'),
    param('zone_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Zone id must be an integer >= 1')
];