const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException
} = require('../utils/exceptions/database.exception');

class BookingParkingSpaceRepository {
    findAllForParkingFloor = async(p_floor_id) => {
        const bookingParkingSpacesList = await DbContext.BookingParkingSpaces.findAllForParkingFloor(p_floor_id);

        return successResponse(bookingParkingSpacesList);
    };

    delete = async(id) => {
        const result = await DbContext.BookingParkingSpaces.deleteById(id);
        if (!result) {
            throw new NotFoundException('Booking parking space not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Booking parking space deleted');
    };
}

module.exports = new BookingParkingSpaceRepository;