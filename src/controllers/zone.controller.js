const ZoneRepository = require('../repositories/zone.repository');

class ZoneController {
    getAllZones = async(req, res, next) => {
        const response = await ZoneRepository.findAll(req.query);
        res.send(response);
    };

    getAllTypeOfSeatsForZone = async(req, res, next) => {
        const response = await ZoneRepository.findAllTypesOfSeats(req.params.id, req.params.event_id);
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