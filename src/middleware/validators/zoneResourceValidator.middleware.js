const { body } = require('express-validator');
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
        .withMessage('Invalid resource type'),
    body('zone_id')
        .exists()
        .withMessage('Zone ID is required for the resource')
        .isInt({ min: 1 })
        .withMessage('Invalid Zone ID found')
];

exports.updateZoneResourceSchema = [
    body('resource_url')
        .optional()
        .trim()
        .bail()
        .isURL()
        .withMessage('Invalid Resource URL found'),
    body('type')
        .optional()
        .trim()
        .bail()
        .isIn([...Object.values(ResourceTypes)])
        .withMessage('Invalid resource type'),
    body('zone_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Invalid Zone ID found'),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['resource_url', 'type', 'zone_id'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];