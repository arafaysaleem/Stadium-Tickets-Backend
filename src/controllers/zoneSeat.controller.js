const ZoneSeatRepository = require('../repositories/zoneSeat.repository');

class ZoneSeatController {
    getAllZoneSeatsByZoneId = async(req, res, next) => {
        const response = await ZoneSeatRepository.findAllForZone(req.params.zone_id);
        res.send(response);
    };

    getZoneSeatById = async(req, res, next) => {
        const response = await ZoneSeatRepository.findOne(req.params.id);
        res.send(response);
    };

    createZoneSeat = async(req, res, next) => {
        const response = await ZoneSeatRepository.create(req.body, req.params.zone_id);
        res.status(201).send(response);
    };

    updateZoneSeat = async(req, res, next) => {
        const response = await ZoneSeatRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteZoneSeat = async(req, res, next) => {
        const response = await ZoneSeatRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new ZoneSeatController;