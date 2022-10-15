const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Roles } = require('../utils/enums/roles.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneController = require('../controllers/zone.controller');
const { createZoneSchema, updateZoneSchema, getZonesQuerySchema, getZoneParamSchema } = require('../middleware/validators/zoneValidator.middleware');

router.route('/zones')
    .get( // localhost:3000/api/API_VERSION/zones
        getZonesQuerySchema,
        checkValidation,
        awaitHandlerFactory(zoneController.getAllZones)
    )
    .post( // localhost:3000/api/API_VERSION/zones
        jwtUserAuth(Roles.Admin),
        createZoneSchema,
        checkValidation,
        awaitHandlerFactory(zoneController.createZone)
    );

router.route('/zones/:id')
    .get( // localhost:3000/api/API_VERSION/zones/1
        getZoneParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneController.getZoneById)
    )
    .patch( // localhost:3000/api/API_VERSION/zones/1 , using patch for partial update
        jwtUserAuth(Roles.Admin),
        getZoneParamSchema,
        updateZoneSchema,
        checkValidation,
        awaitHandlerFactory(zoneController.updateZone)
    )
    .delete( // localhost:3000/api/API_VERSION/zones/1
        jwtUserAuth(Roles.Admin),
        getZoneParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneController.deleteZone)
    );

module.exports = router;