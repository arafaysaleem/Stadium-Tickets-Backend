const ParkingFloorRepository = require('../repositories/parkingFloor.repository');
const BookingParkingSpaceRepository = require('../repositories//bookingParkingSpace.repository');

class ParkingFloorController {
    getAllParkingFloors = async(req, res, _) => {
        const response = await ParkingFloorRepository.findAll();
        res.send(response);
    };

    getAllBookedSpacesForFloor = async(req, res, next) => {
        const response = await BookingParkingSpaceRepository.findAllForParkingFloor(req.params.id);
        res.send(response);
    };

    getParkingFloorById = async(req, res, _) => {
        const response = await ParkingFloorRepository.findOne(req.params.id);
        res.send(response);
    };

    createParkingFloor = async(req, res, _) => {
        const response = await ParkingFloorRepository.create(req.body);
        res.status(201).send(response);
    };

    updateParkingFloor = async(req, res, _) => {
        const response = await ParkingFloorRepository.update(req.body, req.params.id);
        res.send(response);
    };

    deleteParkingFloor = async(req, res, _) => {
        const response = await ParkingFloorRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new ParkingFloorController;