const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const bookingParkingSpaceController = require('../controllers/bookingParkingSpace.controller');
const { getBookingParkingSpaceParamSchema } = require('../middleware/validators/bookingParkingSpaceValidator.middleware');

router.route('/booking-parking-spaces/:id')
    .delete( // localhost:3000/api/API_VERSION/booking-parking-spaces/1
        jwtUserAuth(Role.Admin),
        getBookingParkingSpaceParamSchema,
        checkValidation,
        awaitHandlerFactory(bookingParkingSpaceController.deleteBookingParkingSpace)
    );

module.exports = router;