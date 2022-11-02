const { successResponse } = require('../utils/responses.utils');
const { DbContext } = require('../db/dbContext');

const {
    NotFoundException,
    UpdateFailedException,
    CreateFailedException,
    UnexpectedException
} = require('../utils/exceptions/database.exception');

class EventRepository {
    findAll = async(filters = {}) => {
        const eventsList = await DbContext.Events.findAllByFilters(filters);

        return successResponse(eventsList);
    };

    findOne = async(id) => {
        const event = await DbContext.Events.findById(id);
        
        if (!event) {
            throw new NotFoundException('Event not found');
        }

        return successResponse(event);
    };

    create = async(body) => {
        const result = await DbContext.Events.createNew(body);
        
        if (!result) {
            throw new CreateFailedException('Event failed to be created');
        }

        return successResponse(result, 'Event was created!');
    };

    update = async(body, id) => {
        const result = await DbContext.Events.updateById(body, id);

        if (!result) {
            throw new UnexpectedException('Something went wrong');
        }

        const affectedRows = result[0];

        if (!affectedRows) throw new UpdateFailedException('Event update failed');
        
        const responseBody = {
            rows_changed: affectedRows
        };

        return successResponse(responseBody, 'Event updated successfully');
    };

    delete = async(id) => {
        const result = await DbContext.Events.deleteById(id);
        if (!result) {
            throw new NotFoundException('Event not found');
        }

        const responseBody = {
            rows_removed: result
        };

        return successResponse(responseBody, 'Event has been deleted');
    };
}

module.exports = new EventRepository;