const ZoneRepository = require('../repositories/zone.repository');
const EventBookingRepository = require('../repositories/eventBooking.repository');

class ZoneController {
    getAllZones = async(req, res, next) => {
        const response = await ZoneRepository.findAll(req.query);
        res.send(response);
    };

    getAllBookedSeatsForZone = async(req, res, next) => {
        const response = await EventBookingRepository.findAllBookedSeatsForZone(req.params.id);
        res.send(response);
    };

    getZoneById = async(req, res, next) => {
        const response = await ZoneRepository.findOne(req.params.id);
        res.send(response);
    };

    createZone = async(req, res, next) => {
        const response = await ZoneRepository.create(req.body);
        res.status(201).send(response);
    };

    updateZone = async(req, res, next) => {
        const response = await ZoneRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteZone = async(req, res, next) => {
        const response = await ZoneRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new ZoneController;