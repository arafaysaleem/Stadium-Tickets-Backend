const { Config } = require("../configs/config");
const { DbContext } = require("../db/dbContext");

class DatabaseLoader {
    static async init(){

        // create sequelize pool
        DbContext.init({
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
        await DbContext.checkConnection();
    }
}

module.exports = { DatabaseLoader };