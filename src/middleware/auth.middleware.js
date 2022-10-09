const {
    TokenMissingException,
    TokenVerificationException,
    TokenExpiredException,
    ForbiddenException
} = require('../utils/exceptions/auth.exception');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { Config } = require('../configs/config');

exports.JwtUserAuth = (...allowedRoles) => {
    return async function(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new TokenMissingException();
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = Config.SECRET_JWT;

            // Verify Token
            let decodedUserId;
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        throw new TokenExpiredException();
                    } else if (err.name === 'JsonWebTokenError') {
                        throw new TokenVerificationException();
                    }
                } else decodedUserId = decoded.user_id;
            });
            const user = await UserModel.findByPk(decodedUserId);

            if (!user) {
                throw new TokenVerificationException();
            }

            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (allowedRoles.length && !allowedRoles.includes(user.role)) {
                throw new ForbiddenException();
            }

            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            next(e);
        }
    };
};

exports.ownerAuth = (checkedRoles = [], customOwnerCheck = null) => {
    return async function(req, res, next) {
        try {
            const user = req.currentUser;

            if (!user) {
                throw new TokenVerificationException();
            }

            // if the current user role has to be checked for ownership
            const isChecked = checkedRoles.includes(user.role);

            if (isChecked){ // if needs owner check
                // check if the current user is the owner user
                let isOwner;
                if (customOwnerCheck) isOwner = await customOwnerCheck(req);
                else isOwner = req.params.user_id === user.user_id; // can update self
    
                // if not the owner
                // the user will get this error
                if (!isOwner) throw new ForbiddenException();
            }
            
            next();

        } catch (e) {
            next(e);
        }
    };
};

exports.ApiKeyAuth = () => {
    return async function(req, res, next) {
        try {
            const apiKey = req.header('api-key');
            
            if (!apiKey) {
                throw new TokenMissingException('Access denied. No API Key found.');
            } else if (!apiKey === Config.API_KEY){
                throw new TokenVerificationException('Access denied. API Key is invalid.');
            }

            next();

        } catch (e) {
            next(e);
        }
    };
};