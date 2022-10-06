const { Sequelize } = require('sequelize');
const { DatabaseException } = require('../utils/exceptions/database.exception');

class DatabaseService {
    init({ host, port, user, password, database, connLimit, paramLogging }) {
        if (!this.sequelize){
            this.sequelize = new Sequelize({
                host: host,
                port: port,
                database: database,
                username: user,
                password: password,
                dialect: 'postgres',
                logQueryParameters: paramLogging,
                pool: {
                    max: connLimit,
                    acquire: 30 * 1000
                }
            });
        }
    }

    async checkConnection() {
        try {
            let conn = await this.sequelize.connectionManager.getConnection();
            if (conn){
                this.sequelize.connectionManager.releaseConnection();
            }
        } catch (err) {
            if (err){
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    throw new DatabaseException('Database connection was closed.');
                } else if (err.code === 'ER_CON_COUNT_ERROR') {
                    throw new DatabaseException('Database has too many connections.');
                } else if (err.code === 'ECONNREFUSED') {
                    throw new DatabaseException('Database connection was refused.');
                }
            }
        }
    }
}

module.exports.DBService = new DatabaseService();