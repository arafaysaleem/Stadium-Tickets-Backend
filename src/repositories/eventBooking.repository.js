const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class EventBookingRepository {
    findAll = async(filters = {}) => {
        const eventBookingsList = await DbContext.EventBookings.findAllByFilters(filters);

        return successResponse(eventBookingsList);
    };

    findAllBookedSeatsForZone = async(zone_id) => {
        const eventBookingsList = await DbContext.EventBookings.findAllForZone(zone_id);

        let bookedSeatsList = [];
        eventBookingsList.forEach(booking => bookedSeatsList.push(...booking.booking_seats));

        return successResponse(bookedSeatsList);
    };

    findOne = async(id) => {
        const eventBooking = await DbContext.EventBookings.findById(id);
        
        if (!eventBooking) {
            throw new NotFoundException('Event booking not found');
        }

        return successResponse(eventBooking);
    };
    
    create = async(body) => {
        const result = await DbContext.EventBookings.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Event booking failed to be created');
        }

        return successResponse(result, 'Event booking was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.EventBookings.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Event booking update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Event booking updated successfully');
    };

    delete = async(filters = {}) => {
        const result = await DbContext.EventBookings.deleteByFilters(filters);
        if (!result) {
            throw new NotFoundException('Event booking(s) not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Event booking(s) deleted');
    };
}

module.exports = new EventBookingRepository;