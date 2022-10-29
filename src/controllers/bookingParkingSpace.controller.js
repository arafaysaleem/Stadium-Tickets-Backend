const BookingParkingSpaceRepository = require('../repositories/bookingParkingSpace.repository');

class BookingParkingSpaceController {
    deleteBookingParkingSpace = async(req, res, next) => {
        const response = await BookingParkingSpaceRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new BookingParkingSpaceController;