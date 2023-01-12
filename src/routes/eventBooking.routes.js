const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const eventBookingController = require('../controllers/eventBooking.controller');
const {
    createEventBookingSchema,
    updateEventBookingSchema,
    getEventBookingsQuerySchema,
    getEventBookingParamSchema,
    processBookingPaymentSchema
} = require('../middleware/validators/eventBookingValidator.middleware');

router.route('/event-bookings')
    .get( // localhost:3000/api/API_VERSION/event-bookings
        getEventBookingsQuerySchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.getAllEventBookings)
    )
    .post( // localhost:3000/api/API_VERSION/event-bookings
        createEventBookingSchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.createEventBooking)
    );

router.route('/event-bookings/:id')
    .get( // localhost:3000/api/API_VERSION/event-bookings/1
        getEventBookingParamSchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.getEventBookingById)
    )
    .patch( // localhost:3000/api/API_VERSION/event-bookings/1 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getEventBookingParamSchema,
        updateEventBookingSchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.updateEventBooking)
    )
    .delete( // localhost:3000/api/API_VERSION/event-bookings/1
        jwtUserAuth(Role.Admin),
        getEventBookingParamSchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.deleteEventBooking)
    );

router.route('/event-bookings/:id/process-payment')
    .post( // localhost:3000/api/API_VERSION/event-bookings/1/process-payment
        processBookingPaymentSchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.processBookingPayment)
    );

router.route('/event-bookings/:id/zones/:zone_id/seats')
    .get( // localhost:3000/api/API_VERSION/event-bookings/1/zones/3/seats
        getEventBookingParamSchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.getAllBookedSeatsForZone)
    );

router.route('/event-bookings/:id/parking-floors/:p_floor_id/spaces')
    .get( // localhost:3000/api/API_VERSION/event-bookings/1/parking-floors/3/spaces
        getEventBookingParamSchema,
        checkValidation,
        awaitHandlerFactory(eventBookingController.getAllBookedSpacesForParkingFloor)
    );

module.exports = router;