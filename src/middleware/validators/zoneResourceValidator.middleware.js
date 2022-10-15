const { body, param } = require('express-validator');
const { ResourceTypes } = require('../../utils/enums/resourceType.enum');

exports.createZoneResourceSchema = [
    body('resource_url')
        .trim()
        .exists()
        .withMessage('URL is required for each resource')
        .bail()
        .isURL()
        .withMessage('Invalid Resource URL found'),
    body('type')
        .trim()
        .exists()
        .withMessage('Type is required for each resource')
        .bail()
        .isIn([...Object.values(ResourceTypes)])
        .withMessage('Invalid resource type')
];

exports.updateZoneResourceSchema = [
    body('resource_url')
        .optional()
        .trim()
        .isURL()
        .withMessage('Invalid Resource URL found'),
    body('type')
        .optional()
        .trim()
        .isIn([...Object.values(ResourceTypes)])
        .withMessage('Invalid resource type'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['resource_url', 'type'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getZoneResourceParamSchema = [
    param('zone_id')
        .exists()
        .withMessage('Zone id is required for the endpoint')
        .isInt({ min: 1 })
        .withMessage('Zone id must be an integer >= 1'),
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('ZoneResource id must be an integer >= 1')
];