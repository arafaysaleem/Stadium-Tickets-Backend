const EventBookingRepository = require('../repositories/eventBooking.repository');

class EventBookingController {
    getAllEventBookings = async(req, res, next) => {
        const response = await EventBookingRepository.findAll(req.query);
        res.send(response);
    };

    getEventBookingById = async(req, res, next) => {
        const response = await EventBookingRepository.findOne(req.params.id);
        res.send(response);
    };

    createEventBooking = async(req, res, next) => {
        const response = await EventBookingRepository.create(req.body);
        res.status(201).send(response);
    };

    updateEventBooking = async(req, res, next) => {
        const response = await EventBookingRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteEventBooking = async(req, res, next) => {
        const response = await EventBookingRepository.delete({ booking_id: req.params.id });
        res.send(response);
    };
}

module.exports = new EventBookingController;