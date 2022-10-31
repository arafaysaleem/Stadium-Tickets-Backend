const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const { DatabaseException } = require('../utils/exceptions/database.exception');

class DbContext {
    get Users(){ return this.models.Users; }
    get Events(){ return this.models.Events; }
    get Zones(){ return this.models.Zones; }
    get ParkingFloors(){ return this.models.ParkingFloors; }
    get ZoneResources(){ return this.models.ZoneResources; }
    get ZoneDisabledSeats(){ return this.models.ZoneDisabledSeats; }
    get ParkingDisabledSpaces(){ return this.models.ParkingDisabledSpaces; }
    get ZoneTypes(){ return this.models.ZoneTypes; }
    get EventBookings(){ return this.models.EventBookings; }
    get BookingSeats(){ return this.models.BookingSeats; }
    get BookingParkingSpaces(){ return this.models.BookingParkingSpaces; }

    init({ host, port, user, password, database, dialect, connLimit, paramLogging, useSSL = false }) {
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
                },
                dialectOptions: {
                    ssl: {
                        require: useSSL,
                        rejectUnauthorized: false
                    }
                }
            });

            let models = this.#initModels(this.sequelize);
            models = this.#initAssociations(models);
            this.models = models;

            // this.sequelize.sync({ force: true, alter: true, schema: "public" });
            // this.sequelize.sync({ alter: true, schema: "public" });
        }
    }

    #initModels = (sequelize) => {
        const models = {
            Events: require("./models/event.model"),
            Users: require("./models/user.model"),
            Zones: require("./models/zone.model"),
            ParkingFloors: require("./models/parkingFloor.model"),
            ZoneDisabledSeats: require("./models/zoneDisabledSeat.model"),
            ParkingDisabledSpaces: require("./models/parkingDisabledSpace.model"),
            ZoneResources: require("./models/zoneResource.model"),
            ZoneTypes: require("./models/zoneType.model"),
            EventBookings: require('./models/eventBooking.model'),
            BookingSeats: require('./models/bookingSeat.model'),
            BookingParkingSpaces: require('./models/bookingParkingSpace.model')
        };

        Object.values(models).forEach(model => {
            model.init(sequelize, DataTypes);
        });

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