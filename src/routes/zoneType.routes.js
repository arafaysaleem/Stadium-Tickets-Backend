const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneTypeController = require('../controllers/zoneType.controller');
const { createZoneTypeSchema, updateZoneTypeSchema, getZoneTypeParamSchema } = require('../middleware/validators/zoneTypeValidator.middleware');

router.route('/zone-types')
    .get( // localhost:3000/api/API_VERSION/zone-types
        awaitHandlerFactory(zoneTypeController.getAllZoneTypes)
    )
    .post( // localhost:3000/api/API_VERSION/zone-types
        jwtUserAuth(Role.Admin),
        getZoneTypeParamSchema,
        createZoneTypeSchema,
        checkValidation,
        awaitHandlerFactory(zoneTypeController.createZoneType)
    );

router.route('/zone-types/:id')
    .get( // localhost:3000/api/API_VERSION/zone-types/1
        getZoneTypeParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneTypeController.getZoneTypeById)
    )
    .patch( // localhost:3000/api/API_VERSION/zone-types/1 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getZoneTypeParamSchema,
        updateZoneTypeSchema,
        checkValidation,
        awaitHandlerFactory(zoneTypeController.updateZoneType)
    )
    .delete( // localhost:3000/api/API_VERSION/zone-types/1
        jwtUserAuth(Role.Admin),
        getZoneTypeParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneTypeController.deleteZoneType)
    );

module.exports = router;