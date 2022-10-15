const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class ZoneSeatRepository {
    findAllForZone = async(zone_id) => {
        const zoneSeatsList = await DbContext.ZoneSeats.findAllByFilters({ zone_id });

        return successResponse(zoneSeatsList);
    };

    findOne = async(id) => {
        const zoneSeat = await DbContext.ZoneSeats.findById(id);
        
        if (!zoneSeat) {
            throw new NotFoundException('Zone seat not found');
        }

        return successResponse(zoneSeat);
    };

    
    create = async(body, zone_id) => {
        body.zone_id = zone_id;
        const result = await DbContext.ZoneSeats.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Zone seat failed to be created');
        }

        return successResponse(result, 'Zone seat was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.ZoneSeats.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Zone seat update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Zone seat updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.ZoneSeats.deleteById(id);
        if (!result) {
            throw new NotFoundException('Zone seat not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Zone seat has been deleted');
    };
}

module.exports = new ZoneSeatRepository;