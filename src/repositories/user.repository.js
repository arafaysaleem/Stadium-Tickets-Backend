const { successResponse } = require('../utils/responses.utils');
const { ModelManager } = require('../models/modelManager');

const {
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class UserRepository {
    findAll = async(filters = {}) => {
        
        let userList = await ModelManager.Users.findAll({
            where: {...filters},
            raw: true
        });

        userList = userList.map(user => {
            const {
                password,
                ...restOfUser
            } = user;

            return restOfUser;
        });

        return successResponse(userList);
    };

    findOne = async(id) => {
        let user = await ModelManager.Users.findByPk(id, {raw: true});
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        delete user.password;

        return successResponse(user);
    };

    update = async(body, id) => {
        const result = await ModelManager.Users.update(body, {
            where: {
                user_id: id
            }
        });

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('User update failed');
        
        const responseBody = {
            rows_matched: affectedRows
        };

        return successResponse(responseBody, 'User updated successfully');
    };

    delete = async(id) => {
        const result = await ModelManager.Users.destroy({
            where: { user_id: id }
        });
        if (!result) {
            throw new NotFoundException('User not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'User has been deleted');
    };
}

module.exports = new UserRepository;