const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const zoneResourceController = require('../controllers/zoneResource.controller');
const { createZoneResourceSchema, updateZoneResourceSchema, getZoneResourceParamSchema } = require('../middleware/validators/zoneResourceValidator.middleware');

router.route('/zones/:zone_id/resources')
    .get( // localhost:3000/api/API_VERSION/zones/1/resources/
        getZoneResourceParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneResourceController.getAllZoneResourcesByZoneId)
    )
    .post( // localhost:3000/api/API_VERSION/zones/1/resources
        jwtUserAuth(Role.Admin),
        getZoneResourceParamSchema,
        createZoneResourceSchema,
        checkValidation,
        awaitHandlerFactory(zoneResourceController.createZoneResource)
    );
router.route('/zones/:zone_id/resources/:id')
    .get( // localhost:3000/api/API_VERSION/zones/1/resources/2
        getZoneResourceParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneResourceController.getZoneResourceById)
    )
    .patch( // localhost:3000/api/API_VERSION/zones/1/resources/2 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getZoneResourceParamSchema,
        updateZoneResourceSchema,
        checkValidation,
        awaitHandlerFactory(zoneResourceController.updateZoneResource)
    )
    .delete( // localhost:3000/api/API_VERSION/zones/1/resources/2
        jwtUserAuth(Role.Admin),
        getZoneResourceParamSchema,
        checkValidation,
        awaitHandlerFactory(zoneResourceController.deleteZoneResource)
    );

module.exports = router;