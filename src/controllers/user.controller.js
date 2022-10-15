const UserRepository = require('../repositories/user.repository');

class UserController {
    getAllUsers = async(req, res, next) => {
        const response = await UserRepository.findAll(req.query);
        res.send(response);
    };

    getUserById = async(req, res, next) => {
        const response = await UserRepository.findOne(req.params.id);
        res.send(response);
    };

    updateUser = async(req, res, next) => {
        const response = await UserRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteUser = async(req, res, next) => {
        const response = await UserRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new UserController;