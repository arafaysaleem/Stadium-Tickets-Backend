const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class ZoneDisabledSeatRepository {
    findAllForZone = async(zone_id) => {
        const zoneDisabledSeatsList = await DbContext.ZoneDisabledSeats.findAllByFilters({ zone_id });

        return successResponse(zoneDisabledSeatsList);
    };

    findOne = async(id) => {
        const zoneDisabledSeat = await DbContext.ZoneDisabledSeats.findById(id);
        
        if (!zoneDisabledSeat) {
            throw new NotFoundException('Zone disabled seat not found');
        }

        return successResponse(zoneDisabledSeat);
    };

    
    create = async(body, zone_id) => {
        body.zone_id = zone_id;
        const result = await DbContext.ZoneDisabledSeats.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Zone disabled seat failed to be created');
        }

        return successResponse(result, 'Zone disabled seat was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.ZoneDisabledSeats.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Zone disabled seat update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Zone disabled seat updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.ZoneDisabledSeats.deleteById(id);
        if (!result) {
            throw new NotFoundException('Zone disabled seat not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Zone disabled seat has been deleted');
    };
}

module.exports = new ZoneDisabledSeatRepository;