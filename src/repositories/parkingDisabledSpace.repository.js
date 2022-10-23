const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class ParkingDisabledSpaceRepository {
    findAllForParkingFloor = async(p_floor_id) => {
        const parkingDisabledSpacesList = await DbContext.ParkingDisabledSpaces.findAllByFilters({ p_floor_id });

        return successResponse(parkingDisabledSpacesList);
    };

    findOne = async(id, p_floor_id) => {
        const parkingDisabledSpace = await DbContext.ParkingDisabledSpaces.findById(id, p_floor_id);
        
        if (!parkingDisabledSpace) {
            throw new NotFoundException('Parking disabled space not found');
        }

        return successResponse(parkingDisabledSpace);
    };

    
    create = async(body, p_floor_id) => {
        body.p_floor_id = p_floor_id;
        const result = await DbContext.ParkingDisabledSpaces.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Parking disabled space failed to be created');
        }

        return successResponse(result, 'Parking disabled space was created!');
    };

    update = async(body, id, p_floor_id) => {
        const result = await DbContext.ParkingDisabledSpaces.updateById(body, id, p_floor_id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Parking disabled space update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Parking disabled space updated successfully');
    };

    delete = async(id, p_floor_id) => {
        const result = await DbContext.ParkingDisabledSpaces.deleteById(id, p_floor_id);
        if (!result) {
            throw new NotFoundException('Parking disabled space not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Parking disabled space has been deleted');
    };
}

module.exports = new ParkingDisabledSpaceRepository;