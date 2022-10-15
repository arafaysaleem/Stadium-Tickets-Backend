const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class ZoneResourceRepository {
    findAllForZone = async(zone_id) => {
        const zoneResourcesList = await DbContext.ZoneResources.findAllByFilters({ zone_id });

        return successResponse(zoneResourcesList);
    };

    findOne = async(id) => {
        const zoneResource = await DbContext.ZoneResources.findById(id);
        
        if (!zoneResource) {
            throw new NotFoundException('Zone resource not found');
        }

        return successResponse(zoneResource);
    };

    
    create = async(body, zone_id) => {
        body.zone_id = zone_id;
        const result = await DbContext.ZoneResources.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Zone resource failed to be created');
        }

        return successResponse(result, 'Zone resource was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.ZoneResources.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Zone resource update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Zone resource updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.ZoneResources.deleteById(id);
        if (!result) {
            throw new NotFoundException('Zone resource not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Zone resource has been deleted');
    };
}

module.exports = new ZoneResourceRepository;