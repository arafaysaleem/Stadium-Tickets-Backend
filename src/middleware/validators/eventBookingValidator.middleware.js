const { body, query, param } = require('express-validator');
const { BookingStatus } = require('../../utils/enums/bookingStatus.enum');
const { datetimeRegex, timeRegex, idRegex } = require('../../utils/common.utils');
const EventBookingModel = require('../../db/models/eventBooking.model');

exports.createEventBookingSchema = [
    body('person_name')
        .trim()
        .exists()
        .withMessage('Event booking person name is required')
        .isLength({ min: 1, max: 50 })
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('person_email')
        .trim()
        .exists()
        .withMessage('Person email is required.')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body('amount_payable')
        .exists()
        .withMessage('Total payable amount is required')
        .bail()
        .isDecimal({ force_decimal: false, decimal_digits: '2' })
        .withMessage('Amount should be a valid decimal (0.00)')
        .isFloat({ min: 0.1 })
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
        .isLength({ min: 1, max: 50 })
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
        .isLength({ min: 1, max: 1 })
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
        .matches(idRegex)
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
        .isLength({ min: 1, max: 1 })
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
        .isLength({ min: 1, max: 50 })
        .withMessage('Length must be between 1 and 50')
        .isAlpha('en-US', { ignore: ' ' })
        .withMessage('Must be alphabetic'),
    body('person_email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
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
            const allowUpdates = ['person_name', 'person_email', 'status'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.processBookingPaymentSchema = [
    body('order_amount')
        .exists()
        .withMessage('Total payable amount is required')
        .bail()
        .isDecimal({ force_decimal: false, decimal_digits: '2' })
        .withMessage('Amount should be a valid decimal (0.00)')
        .isFloat({ min: 0.1 })
        .withMessage('Rating should be > 0.0'),
    body('order_date')
        .trim()
        .exists()
        .withMessage('Event date is required')
        .isDate({ format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-'] })
        .withMessage('Event date must be a valid date of format \'YYYY-MM-DD\''),
    body('seats')
        .exists()
        .withMessage('Booking seats summary is required')
        .bail()
        .isObject()
        .withMessage('Booking seats must be an object like {price: 15, qty: 2, total: 30}')
        .bail(),
    body('seats.price')
        .trim()
        .exists()
        .withMessage('Seat price is required')
        .isInt({ min: 1 })
        .withMessage('Invalid price. Should be a whole number > 0'),
    body('seats.qty')
        .trim()
        .exists()
        .withMessage('Seat quantity is required')
        .isInt({ min: 1 })
        .withMessage('Invalid quantity. Should be a whole number > 0'),
    body('seats.total')
        .trim()
        .exists()
        .withMessage('Seat total is required')
        .isInt({ min: 1 })
        .withMessage('Invalid total. Should be a whole number > 0'),
    body('parking')
        .optional()
        .isObject()
        .withMessage('Booking parking must be an object like {price: 15, qty: 2, total: 30}')
        .bail(),
    body('parking.price')
        .if(body('parking').exists())
        .exists()
        .withMessage('Parking price is required')
        .isInt({ min: 1 })
        .withMessage('Invalid price. Should be a whole number > 0'),
    body('parking.qty')
        .if(body('parking').exists())
        .exists()
        .withMessage('Parking quantity is required')
        .isInt({ min: 1 })
        .withMessage('Invalid quantity. Should be a whole number > 0'),
    body('parking.total')
        .if(body('parking').exists())
        .exists()
        .withMessage('Parking total is required')
        .isInt({ min: 1 })
        .withMessage('Invalid total. Should be a whole number > 0'),
    body('event')
        .exists()
        .withMessage('Booking event details are required')
        .bail()
        .isObject()
        .withMessage('Booking event must be an object like {name: "Event Name", date: "YYYY-MM-DD", time: "HH:mm"}')
        .bail(),
    body('event.name')
        .trim()
        .exists()
        .withMessage('Event name is required')
        .isLength({ min: 1, max: 50 })
        .withMessage('Length must be between 1 and 50')
        .isAlphanumeric('en-US', { ignore: new RegExp(/[,. -]/g) })
        .withMessage("Can only be alphanumeric, spaces, or (, -)")
        .toUpperCase(),
    body('event.date')
        .trim()
        .exists()
        .withMessage('Event date is required')
        .isDate({ format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-'] })
        .withMessage('Event date must be a valid date of format \'YYYY-MM-DD\''),
    body('event.time')
        .trim()
        .exists()
        .withMessage('Event start time is required')
        .matches(timeRegex)
        .withMessage('Event start must be a valid time of format \'hh:mm\''),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to process payment')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['order_amount', 'order_date', 'seats', 'parking', 'event'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid fields!')
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
        .withMessage('Zone id must be an integer >= 1'),
    param('p_floor_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Parking Floor id must be an integer >= 1')
];