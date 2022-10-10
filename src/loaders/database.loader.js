const { Config } = require("../configs/config");
const { DBService } = require("../db/dbService");

class DatabaseLoader {
    static async init(){

        // create sequelize pool
        DBService.init({
            host: Config.DB_HOST,
            port: Config.DB_PORT,
            paramLogging: Config.isDev,
            user: Config.DB_USER,
            password: Config.DB_PASS,
            database: Config.DB_DATABASE,
            connLimit: Config.DB_CONN_LIMIT,
            dialect: Config.DB_DIALECT
        });

        // verify connection
        await DBService.checkConnection();
    }
}

module.exports = { DatabaseLoader };