const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class CategoryRepository {
    findAll = async(filters = {}) => {
        const categoriesList = await DbContext.Categories.findAllByFilters(filters);

        return successResponse(categoriesList);
    };

    findOne = async(id) => {
        const category = await DbContext.Categories.findById(id);
        
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return successResponse(category);
    };
    
    create = async(body) => {
        const result = await DbContext.Categories.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Category failed to be created');
        }

        return successResponse(result, 'Category was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.Categories.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Category update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Category updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.Categories.deleteById(id);
        if (!result) {
            throw new NotFoundException('Category not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Category has been deleted');
    };
}

module.exports = new CategoryRepository;