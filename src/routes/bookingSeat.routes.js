const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const bookingSeatController = require('../controllers/bookingSeat.controller');
const { getBookingSeatParamSchema } = require('../middleware/validators/bookingSeatValidator.middleware');

router.route('/booking-seats/:id')
    .delete( // localhost:3000/api/API_VERSION/booking-seats/1
        jwtUserAuth(Role.Admin),
        getBookingSeatParamSchema,
        checkValidation,
        awaitHandlerFactory(bookingSeatController.deleteBookingSeat)
    );

module.exports = router;