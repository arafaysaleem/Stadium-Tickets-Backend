const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const parkingFloorController = require('../controllers/parkingFloor.controller');
const { createParkingFloorSchema, updateParkingFloorSchema, getParkingFloorParamSchema } = require('../middleware/validators/parkingFloorValidator.middleware');

router.route('/parking-floors')
    .get( // localhost:3000/api/API_VERSION/parking-floors
        awaitHandlerFactory(parkingFloorController.getAllParkingFloors)
    )
    .post( // localhost:3000/api/API_VERSION/parking-floors
        jwtUserAuth(Role.Admin),
        createParkingFloorSchema,
        checkValidation,
        awaitHandlerFactory(parkingFloorController.createParkingFloor)
    );

router.route('/parking-floors/:id')
    .get( // localhost:3000/api/API_VERSION/parking-floors/1
        getParkingFloorParamSchema,
        checkValidation,
        awaitHandlerFactory(parkingFloorController.getParkingFloorById)
    )
    .patch( // localhost:3000/api/API_VERSION/parking-floors/1 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getParkingFloorParamSchema,
        updateParkingFloorSchema,
        checkValidation,
        awaitHandlerFactory(parkingFloorController.updateParkingFloor)
    )
    .delete( // localhost:3000/api/API_VERSION/parking-floors/1
        jwtUserAuth(Role.Admin),
        getParkingFloorParamSchema,
        checkValidation,
        awaitHandlerFactory(parkingFloorController.deleteParkingFloor)
    );

router.route('/parking-floors/:id/booked-spaces')
    .get( // localhost:3000/api/API_VERSION/parking-floors/1/booked-spaces
        getParkingFloorParamSchema,
        checkValidation,
        awaitHandlerFactory(parkingFloorController.getAllBookedSpacesForFloor)
    );

module.exports = router;