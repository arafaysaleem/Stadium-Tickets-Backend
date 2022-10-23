const express = require('express');
const router = express.Router();
const { jwtUserAuth } = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const { Role } = require('../utils/enums/role.enum');
const { checkValidation } = require('../middleware/validation.middleware');

const eventController = require('../controllers/event.controller');
const { createEventSchema, updateEventSchema, getEventsQuerySchema, getEventParamSchema } = require('../middleware/validators/eventValidator.middleware');

router.route('/events')
    .get( // localhost:3000/api/API_VERSION/events
        getEventsQuerySchema,
        checkValidation,
        awaitHandlerFactory(eventController.getAllEvents)
    )
    .post( // localhost:3000/api/API_VERSION/events
        jwtUserAuth(Role.Admin),
        createEventSchema,
        checkValidation,
        awaitHandlerFactory(eventController.createEvent)
    );

router.route('/events/:id')
    .get( // localhost:3000/api/API_VERSION/events/1
        getEventParamSchema,
        checkValidation,
        awaitHandlerFactory(eventController.getEventById)
    )
    .patch( // localhost:3000/api/API_VERSION/events/1 , using patch for partial update
        jwtUserAuth(Role.Admin),
        getEventParamSchema,
        updateEventSchema,
        checkValidation,
        awaitHandlerFactory(eventController.updateEvent)
    )
    .delete( // localhost:3000/api/API_VERSION/events/1
        jwtUserAuth(Role.Admin),
        getEventParamSchema,
        checkValidation,
        awaitHandlerFactory(eventController.deleteEvent)
    );

module.exports = router;