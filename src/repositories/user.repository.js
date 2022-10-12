const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class UserRepository {
    findAll = async(filters = {}) => {
        let userList = await DbContext.Users.findAllByFilters(filters);

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
        let user = await DbContext.Users.findById(id);
        
        if (!user) {
            throw new NotFoundException('User not found');
        }

        delete user.password;

        return successResponse(user);
    };

    update = async(body, id) => {
        const result = await DbContext.Users.updateById(body, id);

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
        const result = await DbContext.Users.deleteById(id);
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