const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class ZoneRepository {
    findAll = async(filters = {}) => {
        const zonesList = await DbContext.Zones.findAllByFilters(filters);

        return successResponse(zonesList);
    };

    findOne = async(id) => {
        const zone = await DbContext.Zones.findById(id);
        
        if (!zone) {
            throw new NotFoundException('Zone not found');
        }

        return successResponse(zone);
    };

    findAllTypesOfSeats = async(id) => {
        const disabledSeatsList = await DbContext.ZoneDisabledSeats.findAllByFilters({ zone_id: id });

        const eventBookingsList = await DbContext.EventBookings.findAllForZone(id);
        
        const zoneSeatsList = disabledSeatsList.map((m) => ({
            seat_number: m.seat_number,
            seat_row: m.seat_row,
            type: m.type
        }));

        for (var booking of eventBookingsList) {
            var bookingSeatsList = booking.booking_seats.map((m) => ({
                seat_number: m.seat_number,
                seat_row: m.seat_row,
                type: 'booked'
            }));
            zoneSeatsList.push(...bookingSeatsList);
        }

        return successResponse(zoneSeatsList);
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