const EventRepository = require('../repositories/event.repository');
const EventBookingRepository = require('../repositories/eventBooking.repository');

class EventController {
    getAllEvents = async(req, res, next) => {
        const response = await EventRepository.findAll(req.query);
        res.send(response);
    };

    getEventById = async(req, res, next) => {
        const response = await EventRepository.findOne(req.params.id);
        res.send(response);
    };

    createEvent = async(req, res, next) => {
        const response = await EventRepository.create(req.body);
        res.status(201).send(response);
    };

    updateEvent = async(req, res, next) => {
        const response = await EventRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteEvent = async(req, res, next) => {
        const response = await EventRepository.delete(req.params.id);
        res.send(response);
    };

    deleteEventBookings = async(req, res, next) => {
        const response = await EventBookingRepository.delete({ event_id: req.params.id });
        res.send(response);
    };
}

module.exports = new EventController;