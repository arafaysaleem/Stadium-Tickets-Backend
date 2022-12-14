const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');
const { DisabledSpaceType } = require('../utils/enums/disabledSpaceType.enum');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class ParkingFloorRepository {
    findAll = async(filters = {}) => {
        const parkingFloorsList = await DbContext.ParkingFloors.findAllByFilters(filters);

        return successResponse(parkingFloorsList);
    };

    findOne = async(id) => {
        const parkingFloor = await DbContext.ParkingFloors.findById(id);
        
        if (!parkingFloor) {
            throw new NotFoundException('Parking floor not found');
        }

        return successResponse(parkingFloor);
    };
    
    findAllTypesOfSpaces = async(id) => {
        const disabledSpaces = await DbContext.ParkingDisabledSpaces.findAllByFilters({ p_floor_id: id });

        const parkingBookingsList = await DbContext.BookingParkingSpaces.findAllForParkingFloor(id);

        let blockedSpaces = [];
        let missingSpaces = [];
        for (var disabledSpace of disabledSpaces) {
            var space = { space_number: disabledSpace.space_number, space_row: disabledSpace.space_row };
            if (disabledSpace.type === DisabledSpaceType.Blocked) blockedSpaces.push(space);
            else missingSpaces.push(space);
        }

        let bookedSpaces = [];
        for (var booking of parkingBookingsList) {
            const { space_number, space_row } = booking;
            bookedSpaces.push({ space_number, space_row });
        }

        var parkingFloorSpaces = {
            blocked: blockedSpaces,
            missing: missingSpaces,
            booked: bookedSpaces
        };

        return successResponse(parkingFloorSpaces);
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