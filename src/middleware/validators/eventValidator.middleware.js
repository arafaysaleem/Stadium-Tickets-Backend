const { body, query, param } = require('express-validator');
const { timeRegex } = require('../../utils/common.utils');
const { EventStatus } = require('../../utils/enums/eventStatus.enum');

exports.createEventSchema = [
    body('name')
        .trim()
        .exists()
        .withMessage('Event name is required')
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlphanumeric('en-US', { ignore: [' ', ',', '-'] })
        .withMessage("Can only be alphanumeric, spaces, or ',','-'")
        .toUpperCase(),
    body('poster_url')
        .trim()
        .exists()
        .withMessage('URL is required for a poster image')
        .bail()
        .isURL()
        .withMessage('Invalid Poster URL found'),
    body('start_time')
        .trim()
        .exists()
        .withMessage('Event start time is required')
        .matches(timeRegex)
        .withMessage('Event start must be a valid time of format \'hh:mm\''),
    body('end_time')
        .trim()
        .exists()
        .withMessage('Event start time is required')
        .matches(timeRegex)
        .withMessage('Event end must be a valid time of format \'hh:mm\'')
        .custom((end_time, { req }) => {
            return end_time > req.body.start_time;
        })
        .withMessage('End time must be after start time'),
    body('date')
        .trim()
        .exists()
        .withMessage('Event date is required')
        .isDate({format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']})
        .withMessage('Event date must be a valid date of format \'YYYY-MM-DD\''),
    body('event_status')
        .trim()
        .exists()
        .withMessage('Status is required for each event')
        .bail()
        .isIn([...Object.values(EventStatus)])
        .withMessage('Invalid event status')
];

exports.updateEventSchema = [
    body('name')
        .optional()
        .trim()
        .isLength({min: 1, max: 50})
        .withMessage('Length must be between 1 and 50')
        .isAlphanumeric('en-US', { ignore: [' ', ',', '-'] })
        .withMessage("Can only be alphanumeric, spaces, or ',','-'")
        .toUpperCase(),
    body('poster_url')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid Poster URL found'),
    body('event_status')
        .optional()
        .trim()
        .isIn([...Object.values(EventStatus)])
        .withMessage('Invalid event status'),
    body('start_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Event start must be a valid time of format \'hh:mm\'')
        .custom((_, {req}) => {
            if ((req.body.end_time === undefined) || (req.body.date === undefined)) return false;
            return true;
        })
        .withMessage('end_time and date is required to update event timings'),
    body('end_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Event end must be a valid time of format \'hh:mm\'')
        .custom((end_time, { req }) => {
            return end_time > req.body.start_time;
        })
        .withMessage('End time must be after start time')
        .custom((_, {req}) => {
            if ((req.body.start_time === undefined) || (req.body.date === undefined)) return false;
            return true;
        })
        .withMessage('start_time and date is required to update event timings'),
    body('date')
        .optional()
        .trim()
        .isDate({format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']})
        .withMessage('Event date must be a valid date of format \'YYYY-MM-DD\'')
        .custom((_, {req}) => {
            if ((req.body.end_time === undefined) || (req.body.start_time === undefined)) return false;
            return true;
        })
        .withMessage('end_time and start_time is required to update event date'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['start_time', 'end_time', 'date', 'event_status', 'name', 'poster_url'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getEventQuerySchema = [
    query('start_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Event start must be a valid time of format \'hh:mm\''),
    query('end_time')
        .optional()
        .trim()
        .matches(timeRegex)
        .withMessage('Event end must be a valid time of format \'hh:mm\'')
        .custom((end_time, { req }) => {
            return end_time > req.query.start_time;
        })
        .withMessage('End time must be after start time'),
    query('date')
        .optional()
        .trim()
        .isDate({format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']})
        .withMessage('Event date must be a valid date of format \'YYYY-MM-DD\''),
    query('event_status')
        .optional()
        .trim()
        .isIn([...Object.values(EventStatus)])
        .withMessage('Invalid event status'),
    query()
        .custom(value => {
            const filters = Object.keys(value);
            const allowFilters = ['start_time', 'end_time', 'date', 'event_status'];
            return filters.every(filter => allowFilters.includes(filter));
        })
        .withMessage('Invalid query filters!')
];

exports.getEventParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Event id must be an integer >= 1')
];