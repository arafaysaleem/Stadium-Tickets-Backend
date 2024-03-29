const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { DisabledSeatType } = require('../utils/enums/disabledSeatType.enum');

class ZoneRepository {
    findAll = async(filters = {}) => {
        const zonesList = await DbContext.Zones.findAllByFilters(filters);

        for (var zone of zonesList) {
            let blockedSeatsList = [];
            let missingSeatsList = [];
            for (var seat of zone.disabled_seats) {
                if (zone.type === DisabledSeatType.Blocked) blockedSeatsList.push(seat);
                else missingSeatsList.push(seat);
            }
            zone.setDataValue('blocked', blockedSeatsList);
            zone.setDataValue('missing', missingSeatsList);
            zone.setDataValue('disabled_seats', undefined);
        }

        return successResponse(zonesList);
    };

    findOne = async(id) => {
        const zone = await DbContext.Zones.findById(id);
        
        if (!zone) {
            throw new NotFoundException('Zone not found');
        }

        let blockedSeatsList = [];
        let missingSeatsList = [];
        for (var seat of zone.disabled_seats) {
            if (zone.type === DisabledSeatType.Blocked) blockedSeatsList.push(seat);
            else missingSeatsList.push(seat);
        }
        zone.setDataValue('blocked', blockedSeatsList);
        zone.setDataValue('missing', missingSeatsList);
        zone.setDataValue('disabled_seats', undefined);

        return successResponse(zone);
    };
    
    create = async(body) => {
        const result = await DbContext.Zones.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Zone failed to be created');
        }

        return successResponse(result, 'Zone was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.Zones.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Zone update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Zone updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.Zones.deleteById(id);
        if (!result) {
            throw new NotFoundException('Zone not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Zone has been deleted');
    };
}

module.exports = new ZoneRepository;