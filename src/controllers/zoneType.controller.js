const ZoneTypeRepository = require('../repositories/zoneType.repository');

class ZoneTypeController {
    getAllZoneTypes = async(req, res, next) => {
        const response = await ZoneTypeRepository.findAll();
        res.send(response);
    };

    getZoneTypeById = async(req, res, next) => {
        const response = await ZoneTypeRepository.findOne(req.params.id);
        res.send(response);
    };

    createZoneType = async(req, res, next) => {
        const response = await ZoneTypeRepository.create(req.body);
        res.status(201).send(response);
    };

    updateZoneType = async(req, res, next) => {
        const response = await ZoneTypeRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteZoneType = async(req, res, next) => {
        const response = await ZoneTypeRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new ZoneTypeController;