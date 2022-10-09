const { body } = require('express-validator');
const EmailValidator = require('deep-email-validator');

exports.changePWSchema = [
    body('email')
        .trim()
        .exists()
        .withMessage('User email is required.')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async(email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('old_password')
        .trim()
        .exists()
        .withMessage('Old password is required')
        .notEmpty()
        .withMessage('Old password must be filled'),
    body('new_password')
        .trim()
        .exists()
        .withMessage('New password field is required')
        .notEmpty()
        .withMessage('New password must be filled')
        .custom((value, { req }) => value !== req.body.password)
        .withMessage('New password can\'t be the same as the old password')
];

exports.validateLogin = [
    body('email')
        .trim()
        .exists()
        .withMessage('User email is required.')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async(email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];

exports.validateRefresh = [
    body('email')
        .trim()
        .exists()
        .withMessage('User email is required.')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async(email) => {
            const {valid} = await EmailValidator.validate(email);
            return valid;
        })
        .withMessage('Email unrecognized')
        .normalizeEmail(),
    body('password')
        .trim()
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled'),
    body('old_token')
        .trim()
        .exists()
        .withMessage('Old token is required for refreshing')
        .isJWT()
        .withMessage('Invalid token format')
];