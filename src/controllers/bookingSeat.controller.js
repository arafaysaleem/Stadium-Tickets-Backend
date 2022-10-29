const BookingSeatRepository = require('../repositories/bookingSeat.repository');

class BookingSeatController {
    deleteBookingSeat = async(req, res, next) => {
        const response = await BookingSeatRepository.delete(req.params.id);
        res.send(response);
    };
}

module.exports = new BookingSeatController;