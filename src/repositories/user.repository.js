const { successResponse } = require('../utils/responses.utils');
const { Models } = require('../models/modelManager');

const {
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class UserRepository {
    findAll = async(filters = {}) => {
        
        let userList = await Models.Users.findAll({
            where: {...filters}
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
        let user = await Models.Users.findByPk(id);
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        delete user.password;

        return successResponse(user);
    };

    update = async(body, id) => {
        const result = await Models.Users.update(body, {
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
        const result = await Models.Users.destroy({
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