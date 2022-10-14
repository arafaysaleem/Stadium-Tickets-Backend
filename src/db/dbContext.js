const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const { DatabaseException } = require('../utils/exceptions/database.exception');

class DbContext {
    get Users(){ return this.models.Users; }
    get Events(){ return this.models.Events; }
    get Zones(){ return this.models.Zones; }
    get ZoneResources(){ return this.models.ZoneResources; }
    get ZoneSeats(){ return this.models.ZoneSeats; }
    get ZoneTypes(){ return this.models.ZoneTypes; }

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
                logging: (msg) => console.log(`\n${msg}`),
                benchmark: true,
                pool: {
                    max: connLimit,
                    acquire: 30 * 1000
                }
            });

            let models = this.#initModels(this.sequelize);
            models = this.#initAssociations(models);
            this.models = models;

            // this.sequelize.sync({ force: true, alter: true, schema: "public" });
        }
    }

    #initModels = (sequelize) => {
        const EventModel = require("./models/event.model");
        const UserModel = require("./models/user.model");
        const ZoneModel = require("./models/zone.model");
        const ZoneSeatModel = require("./models/zoneSeat.model");
        const ZoneResourceModel = require("./models/zoneResource.model");
        const ZoneTypeModel = require("./models/zoneType.model");

        EventModel.init(sequelize, DataTypes);
        UserModel.init(sequelize, DataTypes);
        ZoneModel.init(sequelize, DataTypes);
        ZoneSeatModel.init(sequelize, DataTypes);
        ZoneResourceModel.init(sequelize, DataTypes);
        ZoneTypeModel.init(sequelize, DataTypes);

        const models = {
            Events: EventModel,
            Users: UserModel,
            Zones: ZoneModel,
            ZoneSeats: ZoneSeatModel,
            ZoneResources: ZoneResourceModel,
            ZoneTypes: ZoneTypeModel
        };

        return models;
    };

    #initAssociations = (models) => {
        // Run `.associate` if it exists, and assign to class variable
        // ie create relationships in the ORM
        Object.values(models)
            .filter(model => typeof model.associate === "function")
            .forEach(model => {
                model.associate(this.sequelize.models);
            });

        return models;
    };

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

module.exports.DbContext = new DbContext();