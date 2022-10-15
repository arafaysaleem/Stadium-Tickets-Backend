const ZoneResourceRepository = require('../repositories/zoneResource.repository');

class ZoneResourceController {
    getAllZoneResourcesByZoneId = async(req, res, next) => {
        const response = await ZoneResourceRepository.findAllForZone(req.params.zone_id);
        res.send(response);
    };

    getZoneResourceById = async(req, res, next) => {
        const response = await ZoneResourceRepository.findOne(req.params.id);
        res.send(response);
    };

    createZoneResource = async(req, res, next) => {
        const response = await ZoneResourceRepository.create(req.body, req.params.zone_id);
        res.status(201).send(response);
    };

    updateZoneResource = async(req, res, next) => {
        const response = await ZoneResourceRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteZoneResource = async(req, res, next) => {
        const response = await ZoneResourceRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new ZoneResourceController;