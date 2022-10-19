const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const parkingDisabledSpaceController = require('../controllers/parkingDisabledSpace.controller');
const { createParkingDisabledSpaceSchema, updateParkingDisabledSpaceSchema, getParkingDisabledSpaceParamSchema } = require('../middleware/validators/parkingDisabledSpaceValidator.middleware');

router.route('/parking-floors/:p_floor_id/disabled-spaces')
    .get( // localhost:3000/api/API_VERSION/parking-floors/1/disabled-spaces
        getParkingDisabledSpaceParamSchema,
        checkValidation,
        awaitHandlerFactory(parkingDisabledSpaceController.getAllParkingDisabledSpacesByParkingFloorId)
    )
    .post( // localhost:3000/api/API_VERSION/parking-floors/1/disabled-spaces
        jwtUserAuth(Role.Admin),
        getParkingDisabledSpaceParamSchema,
        createParkingDisabledSpaceSchema,
        checkValidation,
        awaitHandlerFactory(parkingDisabledSpaceController.createParkingDisabledSpace)
    );

router.route('/parking-floors/:p_floor_id/disabled-spaces/:id')
    .get( // localhost:3000/api/API_VERSION/parking-floors/1/disabled-spaces/2
        getParkingDisabledSpaceParamSchema,
        checkValidation,
        awaitHandlerFactory(parkingDisabledSpaceController.getParkingDisabledSpaceById)
    )
    .patch( // localhost:3000/api/API_VERSION/parking-floors/1/disabled-spaces/2 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getParkingDisabledSpaceParamSchema,
        updateParkingDisabledSpaceSchema,
        checkValidation,
        awaitHandlerFactory(parkingDisabledSpaceController.updateParkingDisabledSpace)
    )
    .delete( // localhost:3000/api/API_VERSION/parking-floors/1/disabled-spaces/2
        jwtUserAuth(Role.Admin),
        getParkingDisabledSpaceParamSchema,
        checkValidation,
        awaitHandlerFactory(parkingDisabledSpaceController.deleteParkingDisabledSpace)
    );

module.exports = router;