const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Roles } = require('../utils/enums/roles.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneResourceController = require('../controllers/zoneResource.controller');
const { createZoneResourceSchema, updateZoneResourceSchema } = require('../middleware/validators/zoneResourceValidator.middleware');

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