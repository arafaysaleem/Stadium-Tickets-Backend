const { Config } = require("../configs/config");
const { DBService } = require("../db/db-service");
const { ModelManager } = require("../models/modelManager");

class DatabaseLoader {
    static init(){

        // create sequelize pool
        DBService.init({
            host: Config.DB_HOST,
            port: Config.DB_PORT,
            paramLogging: Config.isDev,
            user: Config.DB_USER,
            password: Config.DB_PASS,
            database: Config.DB_DATABASE,
            connLimit: Config.DB_CONN_LIMIT
        });

        // verify connection
        DBService.checkConnection();

        // load ORM models
        ModelManager.init();
    }
}

module.exports = { DatabaseLoader };