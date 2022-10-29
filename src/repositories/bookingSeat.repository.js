const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException
} = require('../utils/exceptions/database.exception');

class BookingSeatRepository {
    delete = async(id) => {
        const result = await DbContext.BookingSeats.deleteById(id);
        if (!result) {
            throw new NotFoundException('Booking seat not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Booking seat deleted');
    };
}

module.exports = new BookingSeatRepository;