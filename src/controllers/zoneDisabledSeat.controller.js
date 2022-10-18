const ZoneDisabledSeatRepository = require('../repositories/zoneDisabledSeat.repository');

class ZoneDisabledSeatController {
    getAllZoneDisabledSeatsByZoneId = async(req, res, next) => {
        const response = await ZoneDisabledSeatRepository.findAllForZone(req.params.zone_id);
        res.send(response);
    };

    getZoneDisabledSeatById = async(req, res, next) => {
        const response = await ZoneDisabledSeatRepository.findOne(req.params.id);
        res.send(response);
    };

    createZoneDisabledSeat = async(req, res, next) => {
        const response = await ZoneDisabledSeatRepository.create(req.body, req.params.zone_id);
        res.status(201).send(response);
    };

    updateZoneDisabledSeat = async(req, res, next) => {
        const response = await ZoneDisabledSeatRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteZoneDisabledSeat = async(req, res, next) => {
        const response = await ZoneDisabledSeatRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new ZoneDisabledSeatController;