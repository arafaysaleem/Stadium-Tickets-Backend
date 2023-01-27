const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class SnackRepository {
    findAllForBrand = async(brand_id) => {
        const snacksList = await DbContext.Snacks.findAllByFilters({ brand_id });

        return successResponse(snacksList);
    };

    findOne = async(id, brand_id) => {
        const snack = await DbContext.Snacks.findById(id, brand_id);
        
        if (!snack) {
            throw new NotFoundException('Snack not found');
        }

        return successResponse(snack);
    };

    
    create = async(body, brand_id) => {
        body.brand_id = brand_id;
        const result = await DbContext.Snacks.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Snack failed to be created');
        }

        return successResponse(result, 'Snack was created!');
    };

    update = async(body, id, brand_id) => {
        const result = await DbContext.Snacks.updateById(body, id, brand_id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Snack update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Snack updated successfully');
    };

    delete = async(id, brand_id) => {
        const result = await DbContext.Snacks.deleteById(id, brand_id);
        if (!result) {
            throw new NotFoundException('Snack not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Snack has been deleted');
    };
}

module.exports = new SnackRepository;