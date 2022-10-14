const { Config } = require('../configs/config');
const { failureResponse } = require('../utils/responses.utils');
const { InternalServerException } = require('../utils/exceptions/api.exception');
const { DuplicateEntryException, ForeignKeyViolationException } = require('../utils/exceptions/database.exception');

function errorMiddleware(err, req, res, next) {
    if (err.name && err.name.startsWith('Sequelize')){
        if (err.name === 'SequelizeUniqueConstraintError'){
            err = new DuplicateEntryException(err.original.detail);
        } else if (err.name === 'SequelizeForeignKeyConstraintError'){
            err = new ForeignKeyViolationException(err.original.detail);
        }
    } else if (!err.message) {
        if (!err.isOperational) err = new InternalServerException('Internal server error');
    } else if (err.status === 500) {
        if (!err.isOperational) err = new InternalServerException(err.message, err.data);
    }

    let { message, code, status, data, stack } = err;

    if (Config.isDev){
        console.log(`[Exception] ${code}, [Code] ${status}`);
        console.log(`[Error] ${message}`);
        console.log(`[Stack] ${stack}`);
    }

    const response = failureResponse(code, message, data);

    res.status(status).send(response);
}

module.exports = errorMiddleware;