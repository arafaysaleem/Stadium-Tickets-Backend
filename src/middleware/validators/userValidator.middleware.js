const { body, param } = require('express-validator');
const { Roles } = require('../../utils/enums/roles.enum');
const EmailValidator = require('deep-email-validator');

exports.createUserSchema = [
    body('email')
        .trim()
        .exists()
        .withMessage('User email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async(email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('full_name')
        .trim()
        .exists()
        .withMessage('First name is required')
        .isLength({ min: 2 })
        .withMessage('Must be at least 2 chars long')
        .isAlpha('en-US', {ignore: ' '})
        .withMessage('First name should be all alphabets'),
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('role')
        .trim()
        .exists()
        .isIn([...Object.values(Roles)])
        .withMessage('Invalid Role type')
];

exports.updateUserSchema = [
    body('full_name')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Must be at least 2 chars long')
        .isAlpha('en-US', {ignore: ' '})
        .withMessage('Full name should be all alphabets'),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
    body()
        .custom(value => {
            return Object.keys(value).length !== 0;
        })
        .withMessage('Please provide required fields to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['full_name', 'email'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.getUserParamSchema = [
    param('id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('User id must be an integer >= 1')
];