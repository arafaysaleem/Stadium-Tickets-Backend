const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneDisabledSeatController = require('../controllers/zoneDisabledSeat.controller');
const { createZoneDisabledSeatSchema, updateZoneDisabledSeatSchema, getZoneDisabledSeatParamSchema } = require('../middleware/validators/zoneDisabledSeatValidator.middleware');

router.route('/zones/:zone_id/disabled-seats')
    .get( // localhost:3000/api/API_VERSION/zones/1/disabled-seats
        getZoneDisabledSeatParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneDisabledSeatController.getAllZoneDisabledSeatsByZoneId)
    )
    .post( // localhost:3000/api/API_VERSION/zones/1/disabled-seats
        jwtUserAuth(Role.Admin),
        getZoneDisabledSeatParamSchema,
        createZoneDisabledSeatSchema,
        checkValidation,
        awaitHandlerFactory(zoneDisabledSeatController.createZoneDisabledSeat)
    );

router.route('/zones/:zone_id/disabled-seats/:id')
    .get( // localhost:3000/api/API_VERSION/zones/1/disabled-seats/2
        getZoneDisabledSeatParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneDisabledSeatController.getZoneDisabledSeatById)
    )
    .patch( // localhost:3000/api/API_VERSION/zones/1/disabled-seats/2 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getZoneDisabledSeatParamSchema,
        updateZoneDisabledSeatSchema,
        checkValidation,
        awaitHandlerFactory(zoneDisabledSeatController.updateZoneDisabledSeat)
    )
    .delete( // localhost:3000/api/API_VERSION/zones/1/disabled-seats/2
        jwtUserAuth(Role.Admin),
        getZoneDisabledSeatParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneDisabledSeatController.deleteZoneDisabledSeat)
    );

module.exports = router;