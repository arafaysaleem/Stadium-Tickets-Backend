const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class ZoneTypeRepository {
    findAll = async(filters = {}) => {
        const zoneTypesList = await DbContext.ZoneTypes.findAllByFilters(filters);

        return successResponse(zoneTypesList);
    };

    findOne = async(id) => {
        const zoneType = await DbContext.ZoneTypes.findById(id);
        
        if (!zoneType) {
            throw new NotFoundException('Zone type not found');
        }

        return successResponse(zoneType);
    };

    
    create = async(body) => {
        const result = await DbContext.ZoneTypes.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Zone type failed to be created');
        }

        return successResponse(result, 'Zone type was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.ZoneTypes.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Zone type update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Zone type updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.ZoneTypes.deleteById(id);
        if (!result) {
            throw new NotFoundException('Zone type not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Zone type has been deleted');
    };
}

module.exports = new ZoneTypeRepository;