const AuthRepository = require('../repositories/auth.repository');

class AuthController {

    register = async(req, res, next) => {
        const response = await AuthRepository.register(req.body);
        res.status(201).send(response);
    };

    login = async(req, res, next) => {
        const response = await AuthRepository.login(req.body.email, req.body.password);
        res.send(response);
    };

    refreshToken = async(req, res, next) => {
        const response = await AuthRepository.refreshToken(req.body.email, req.body.password, req.body.old_token);
        res.send(response);
    };

    changePassword = async(req, res, next) => {
        const response = await AuthRepository.changePassword(req.body.email, req.body.new_password, req.body.old_password);
        res.send(response);
    };
}

module.exports = new AuthController;