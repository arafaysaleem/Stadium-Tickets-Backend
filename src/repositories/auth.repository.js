const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    RegistrationFailedException,
    InvalidCredentialsException,
    TokenVerificationException
} = require('../utils/exceptions/auth.exception');
const {
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { hashPassword } = require('../utils/common.utils');
const { successResponse } = require('../utils/responses.utils');
const { Config } = require('../configs/config');

const { ModelManager } = require('../models/modelManager');

class AuthRepository {

    register = async(body) => {
        const pass = body.password;

        body.password = await hashPassword(body.password);

        const result = await ModelManager.Users.create(body);

        if (!result) {
            throw new RegistrationFailedException();
        }

        return this.login(body.user_id, pass, true);
    };

    login = async(email, pass, is_register = false) => {
        const user = await ModelManager.Users.findOne({ where: { email }, benchmark: true });
        if (!user) {
            throw new InvalidCredentialsException('User not registered');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect password');
        }

        // user matched!
        const secretKey = Config.SECRET_JWT;
        const token = jwt.sign({ user_id: user.user_id }, secretKey, {
            expiresIn: Config.EXPIRY_JWT
        });

        let message = "";
        let responseBody = "";
        if (is_register){ // if registered first
            message = "Registered"; // set msg to registered
        } else {
            message = "Authenticated";
        }
        user.password = undefined;

        responseBody = {
            ...user,
            token
        };

        return successResponse(responseBody, message);
    };

    refreshToken = async(email, pass, old_token) => {
        const user = await ModelManager.Users.findOne({ where: { email } });
        if (!user) {
            throw new InvalidCredentialsException('User not registered');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect password');
        }

        let token;
        
        // Check old token
        const secretKey = Config.SECRET_JWT;
        jwt.verify(old_token, secretKey, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') { // only sign a new token if old expired
                    const {user_id: decodedId} = jwt.decode(old_token);
                    if (user.user_id !== decodedId){
                        throw new TokenVerificationException();
                    }
                    
                    // user matched! Now sign
                    token = jwt.sign({ user_id: user.user_id }, secretKey, {
                        expiresIn: Config.EXPIRY_JWT
                    });
                } else if (err.name === 'JsonWebTokenError') {
                    throw new TokenVerificationException("Invalid Token");
                }
            } else {
                token = old_token; // return same token if valid and not expired
            }
        });

        return successResponse({ token }, "Refreshed");
    };

    changePassword = async(email, new_password, old_password) => {
        const user = await ModelManager.Users.findOne({ where: { email } });

        if (!user) {
            throw new InvalidCredentialsException('User not registered');
        }

        const isMatch = await bcrypt.compare(old_password, user.password);

        if (!isMatch) {
            throw new InvalidCredentialsException('Incorrect old password');
        }

        let newPassword = await hashPassword(new_password);
    
        const result = await ModelManager.Users.update({password: newPassword}, { where: { user_id: user.user_id } });
    
        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }
        const affectedRows = result[0];
    
        if (!affectedRows) throw new UpdateFailedException('Password reset failed');
        
        const responseBody = {
            rows_matched: affectedRows
        };
    
        return successResponse(responseBody, 'Password reset successfully');
    };
}

module.exports = new AuthRepository;