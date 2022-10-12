const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Roles } = require('../utils/enums/roles.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneTypeController = require('../controllers/zoneType.controller');
const { createZoneTypeSchema, updateZoneTypeSchema } = require('../middleware/validators/zoneTypeValidator.middleware');

router.get('/',
    awaitHandlerFactory(zoneTypeController.getAllZoneTypes)
); // localhost:3000/api/API_VERSION/zone-types

router.get('/:id',
    awaitHandlerFactory(zoneTypeController.getZoneTypeById)
); // localhost:3000/api/API_VERSION/zone-types/1

router.post('/',
    jwtUserAuth(Roles.Admin),
    createZoneTypeSchema,
    checkValidation,
    awaitHandlerFactory(zoneTypeController.createZoneType)
); // localhost:3000/api/API_VERSION/zone-types

router.patch('/:id',
    jwtUserAuth(Roles.Admin),
    updateZoneTypeSchema,
    checkValidation,
    awaitHandlerFactory(zoneTypeController.updateZoneType)
); // localhost:3000/api/API_VERSION/zone-types/1 , using patch for partial update

router.delete('/:id',
    jwtUserAuth(Roles.Admin),
    awaitHandlerFactory(zoneTypeController.deleteZoneType)
); // localhost:3000/api/API_VERSION/zone-types/1

module.exports = router;