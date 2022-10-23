const ParkingDisabledSpaceRepository = require('../repositories/parkingDisabledSpace.repository');

class ParkingDisabledSpaceController {
    getAllParkingDisabledSpacesByParkingFloorId = async(req, res, next) => {
        const response = await ParkingDisabledSpaceRepository.findAllForParkingFloor(req.params.p_floor_id);
        res.send(response);
    };

    getParkingDisabledSpaceById = async(req, res, next) => {
        const response = await ParkingDisabledSpaceRepository.findOne(req.params.id, req.params.p_floor_id);
        res.send(response);
    };

    createParkingDisabledSpace = async(req, res, next) => {
        const response = await ParkingDisabledSpaceRepository.create(req.body, req.params.p_floor_id);
        res.status(201).send(response);
    };

    updateParkingDisabledSpace = async(req, res, next) => {
        const response = await ParkingDisabledSpaceRepository.update(req.body, req.params.id, req.params.p_floor_id);
        res.send(response);
    };

    deleteParkingDisabledSpace = async(req, res, next) => {
        const response = await ParkingDisabledSpaceRepository.delete(req.params.id, req.params.p_floor_id);
        res.send(response);
    };
}

module.exports = new ParkingDisabledSpaceController;