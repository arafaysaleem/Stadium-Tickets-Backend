const { Sequelize } = require('sequelize');
const { ModelManager } = require('../models/modelManager');
const { DatabaseException } = require('../utils/exceptions/database.exception');

class DatabaseService {
    init({ host, port, user, password, database, dialect, connLimit, paramLogging }) {
        if (!this.sequelize){
            this.sequelize = new Sequelize({
                host: host,
                port: port,
                database: database,
                username: user,
                password: password,
                dialect: dialect,
                logQueryParameters: paramLogging,
                logging: (...msg) => console.log(msg),
                benchmark: true,
                pool: {
                    max: connLimit,
                    acquire: 30 * 1000
                }
            });

            ModelManager.init(this.sequelize);

            // this.sequelize.sync({ force: true, alter: true, schema: "public" });
        }
    }

    async checkConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection estabilished succesfully');
        } catch (err) {
            if (err){
                throw new DatabaseException(err.message);
            }
        }
    }
}

module.exports.DBService = new DatabaseService();