const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Roles } = require('../utils/enums/roles.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneSeatController = require('../controllers/zoneSeat.controller');
const { createZoneSeatSchema, updateZoneSeatSchema, getZoneSeatParamSchema } = require('../middleware/validators/zoneSeatValidator.middleware');

router.route('/zones/:zone_id/seats')
    .get( // localhost:3000/api/API_VERSION/zones/1/seats
        getZoneSeatParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneSeatController.getAllZoneSeatsByZoneId)
    )
    .post( // localhost:3000/api/API_VERSION/zones/1/seats
        jwtUserAuth(Roles.Admin),
        getZoneSeatParamSchema,
        createZoneSeatSchema,
        checkValidation,
        awaitHandlerFactory(zoneSeatController.createZoneSeat)
    );

router.route('/zones/:zone_id/seats/:id')
    .get( // localhost:3000/api/API_VERSION/zones/1/seats/2
        getZoneSeatParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneSeatController.getZoneSeatById)
    )
    .patch( // localhost:3000/api/API_VERSION/zones/1/seats/2 , using patch for partial update
        jwtUserAuth(Roles.Admin),
        getZoneSeatParamSchema,
        updateZoneSeatSchema,
        checkValidation,
        awaitHandlerFactory(zoneSeatController.updateZoneSeat)
    )
    .delete( // localhost:3000/api/API_VERSION/zones/1/seats/2
        jwtUserAuth(Roles.Admin),
        getZoneSeatParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneSeatController.deleteZoneSeat)
    );

module.exports = router;