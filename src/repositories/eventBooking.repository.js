const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { BookingStatus } = require('../utils/enums/bookingStatus.enum');
const { sendBookingSummaryEmail } = require('../utils/sendgrid.utils');

class EventBookingRepository {
    findAll = async(filters = {}) => {
        const eventBookingsList = await DbContext.EventBookings.findAllByFilters(filters);

        return successResponse(eventBookingsList);
    };

    findOne = async(id) => {
        const eventBooking = await DbContext.EventBookings.findById(id);
        
        if (!eventBooking) {
            throw new NotFoundException('Event booking not found');
        }

        return successResponse(eventBooking);
    };

    findAllZoneBookedSeats = async(id, zone_id) => {
        const eventBookingsList = await DbContext.EventBookings.findAllForZone(id, zone_id);
        
        let bookedSeatsList = [];
        for (var booking of eventBookingsList) {
            var bookingSeatsList = booking.booking_seats.map((m) => ({
                seat_number: m.seat_number,
                seat_row: m.seat_row
            }));
            bookedSeatsList.push(...bookingSeatsList);
        }

        return successResponse(bookedSeatsList);
    };

    findAllParkingBookedSpaces = async(id, p_floor_id) => {
        const parkingBookingsList = await DbContext.BookingParkingSpaces.findAllForParkingFloor(p_floor_id, id);

        let bookedSpacesList = [];
        for (var booking of parkingBookingsList) {
            const { space_number, space_row } = booking;
            bookedSpacesList.push({ space_number, space_row });
        }

        return successResponse(bookedSpacesList);
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

        if (!affectedRows && !result[1]) throw new UpdateFailedException('Event booking update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Event booking updated successfully');
    };

    confirmPayment = async(body, id) => {
        const result = await DbContext.EventBookings.updateById({ status: BookingStatus.Confirmed }, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const booking = result[1];

        if (!booking) throw new UpdateFailedException('Event booking confirmation failed');
        
        body.person = { name: booking.person_name, email: booking.person_email };
        sendBookingSummaryEmail(body, id);

        const responseBody = {
            rows_changed: 1
        };

        return successResponse(responseBody, 'Event booking confirmed successfully');
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