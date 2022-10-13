const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Roles } = require('../utils/enums/roles.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneResourceController = require('../controllers/zoneResource.controller');
const zoneController = require('../controllers/zone.controller');
const { createZoneResourceSchema, updateZoneResourceSchema } = require('../middleware/validators/zoneResourceValidator.middleware');
const { createZoneSchema, updateZoneSchema, getZonesQuerySchema } = require('../middleware/validators/zoneValidator.middleware');

router.get('/',
    getZonesQuerySchema,
    checkValidation,
    awaitHandlerFactory(zoneController.getAllZones)
); // localhost:3000/api/API_VERSION/zones

router.get('/:id',
    awaitHandlerFactory(zoneController.getZoneById)
); // localhost:3000/api/API_VERSION/zones/1

router.post('/',
    jwtUserAuth(Roles.Admin),
    createZoneSchema,
    checkValidation,
    awaitHandlerFactory(zoneController.createZone)
); // localhost:3000/api/API_VERSION/zones

router.patch('/:id',
    jwtUserAuth(Roles.Admin),
    updateZoneSchema,
    checkValidation,
    awaitHandlerFactory(zoneController.updateZone)
); // localhost:3000/api/API_VERSION/zones/1 , using patch for partial update

router.delete('/:id',
    jwtUserAuth(Roles.Admin),
    awaitHandlerFactory(zoneController.deleteZone)
); // localhost:3000/api/API_VERSION/zones/1

router.get('/:zone_id/resources',
    awaitHandlerFactory(zoneResourceController.getAllZoneResourcesByZoneId)
); // localhost:3000/api/API_VERSION/zones/1/resources

router.get('/:zone_id/resources/:id',
    awaitHandlerFactory(zoneResourceController.getZoneResourceById)
); // localhost:3000/api/API_VERSION/zones/1/resources/2

router.post('/:zone_id/resources/',
    jwtUserAuth(Roles.Admin),
    createZoneResourceSchema,
    checkValidation,
    awaitHandlerFactory(zoneResourceController.createZoneResource)
); // localhost:3000/api/API_VERSION/zones/1/resources

router.patch('/:zone_id/resources/:id',
    jwtUserAuth(Roles.Admin),
    updateZoneResourceSchema,
    checkValidation,
    awaitHandlerFactory(zoneResourceController.updateZoneResource)
); // localhost:3000/api/API_VERSION/zones/1/resources/2 , using patch for partial update

router.delete('/:zone_id/resources/:id',
    jwtUserAuth(Roles.Admin),
    awaitHandlerFactory(zoneResourceController.deleteZoneResource)
); // localhost:3000/api/API_VERSION/zones/1/resources/2

module.exports = router;