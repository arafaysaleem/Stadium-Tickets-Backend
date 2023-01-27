const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class BrandRepository {
    findAllForCategory = async(category_id) => {
        const brandsList = await DbContext.Brands.findAllByFilters({ category_id });

        return successResponse(brandsList);
    };

    findOne = async(id, category_id) => {
        const brand = await DbContext.Brands.findById(id, category_id);
        
        if (!brand) {
            throw new NotFoundException('Brand not found');
        }

        return successResponse(brand);
    };

    
    create = async(body, category_id) => {
        body.category_id = category_id;
        const result = await DbContext.Brands.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Brand failed to be created');
        }

        return successResponse(result, 'Brand was created!');
    };

    update = async(body, id, category_id) => {
        const result = await DbContext.Brands.updateById(body, id, category_id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Brand update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Brand updated successfully');
    };

    delete = async(id, category_id) => {
        const result = await DbContext.Brands.deleteById(id, category_id);
        if (!result) {
            throw new NotFoundException('Brand not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Brand has been deleted');
    };
}

module.exports = new BrandRepository;