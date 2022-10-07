const { DBService } = require("../db/dbService");
const { DataTypes } = require('sequelize');

class ModelManager {
    constructor(){
        var models = this.#initModels();
        models = this.#initAssociations(models);
        
        this.models = models;
    }

    #initModels = () => {
        const EventModel = require("./event.model");
        const UserModel = require("./user.model");
        const ZoneModel = require("./zone.model");
        const ZoneSeatModel = require("./zoneSeat.model");
        const ZoneResourceModel = require("./zoneResource.model");
        const ZoneTypeModel = require("./zoneType.model");

        const sequelize = DBService.sequelize;

        const models = {
            Events: EventModel.init(sequelize, DataTypes),
            Users: UserModel.init(sequelize, DataTypes),
            Zones: ZoneModel.init(sequelize, DataTypes),
            ZoneSeats: ZoneSeatModel.init(sequelize, DataTypes),
            ZoneResources: ZoneResourceModel.init(sequelize, DataTypes),
            ZoneTypes: ZoneTypeModel.init(sequelize, DataTypes)
        };

        return models;
    };

    #initAssociations = (models) => {
        // Run `.associate` if it exists, and assign to class variable
        // ie create relationships in the ORM
        Object.values(models)
            .filter(model => typeof model.associate === "function")
            .forEach(model => {
                model.associate(models);
            });

        return models;
    };
}

module.exports.ModelManager = {...(new ModelManager()).models};