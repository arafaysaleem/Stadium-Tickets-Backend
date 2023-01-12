const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');
const { DisabledSpaceType } = require('../utils/enums/disabledSpaceType.enum');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');
const { Config } = require('../configs/config');

class ParkingFloorRepository {
    findAll = async(filters = {}) => {
        const parkingFloorsList = await DbContext.ParkingFloors.findAllByFilters(filters);
        
        for (var parkingFloor of parkingFloorsList) {
            let blockedSpacesList = [];
            let missingSpacesList = [];
            for (var space of parkingFloor.disabled_spaces) {
                if (space.type === DisabledSpaceType.Blocked) blockedSpacesList.push(space);
                else missingSpacesList.push(space);
            }
            parkingFloor.setDataValue('price', Number(Config.PARKING_PRICE));
            parkingFloor.setDataValue('blocked', blockedSpacesList);
            parkingFloor.setDataValue('missing', missingSpacesList);
            parkingFloor.setDataValue('disabled_spaces', undefined);
        }

        return successResponse(parkingFloorsList);
    };

    findOne = async(id) => {
        const parkingFloor = await DbContext.ParkingFloors.findById(id);
        
        if (!parkingFloor) {
            throw new NotFoundException('Parking floor not found');
        }

        let blockedSpacesList = [];
        let missingSpacesList = [];
        for (var space of parkingFloor.disabled_spaces) {
            if (space.type === DisabledSpaceType.Blocked) blockedSpacesList.push(space);
            else missingSpacesList.push(space);
        }
        parkingFloor.setDataValue('price', Number(Config.PARKING_PRICE));
        parkingFloor.setDataValue('blocked', blockedSpacesList);
        parkingFloor.setDataValue('missing', missingSpacesList);
        parkingFloor.setDataValue('disabled_spaces', undefined);

        return successResponse(parkingFloor);
    };

    create = async(body) => {
        const result = await DbContext.ParkingFloors.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Parking floor failed to be created');
        }

        return successResponse(result, 'Parking floor was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.ParkingFloors.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Parking floor update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Parking floor updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.ParkingFloors.deleteById(id);
        if (!result) {
            throw new NotFoundException('Parking floor not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Parking floor has been deleted');
    };
}

module.exports = new ParkingFloorRepository;