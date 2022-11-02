const { Config } = require('../configs/config');
const { failureResponse } = require('../utils/responses.utils');
const { InternalServerException } = require('../utils/exceptions/api.exception');
const { DuplicateEntryException, ForeignKeyViolationException, DatabaseException } = require('../utils/exceptions/database.exception');

function errorMiddleware(err, req, res, next) {
    if (err.name && err.name.startsWith('Sequelize')){
        err = dbErrorHandler(err);
    } else if (err.status === 500 && !err.isOperational) {
        err = new InternalServerException(err.message, err.data);
    } else if (!err.code || (!err.message && !err.isOperational)) {
        err = new InternalServerException('Internal server error');
    }

    let { message, code, status, data, stack } = err;

    if (Config.isDev){
        console.log(`[Exception] ${code}, [Code] ${status}`);
        console.log(`[Error] ${message}`);
        console.log(`[Stack] ${stack}`);
    }

    const response = failureResponse(code, message, data);

    res.status(status || 500).send(response);
}

function dbErrorHandler(err){
    let error;
    if (err.name === 'SequelizeUniqueConstraintError'){
        error = new DuplicateEntryException(err.original.detail);
    } else if (err.name === 'SequelizeForeignKeyConstraintError'){
        error = new ForeignKeyViolationException(err.original.detail);
    } else {
        error = new DatabaseException(err.original.detail || 'Something wrong with the database');
    }
    return error;
}

module.exports = errorMiddleware;