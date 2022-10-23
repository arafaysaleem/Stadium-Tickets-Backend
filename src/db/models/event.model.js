const { Model } = require('sequelize');
const { EventStatus } = require('../../utils/enums/eventStatus.enum');

class EventModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                event_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    length: 50,
                    allowNull: false
                },
                poster_url: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                date: {
                    type: DataTypes.DATEONLY,
                    allowNull: false
                },
                start_time: {
                    type: DataTypes.TIME,
                    allowNull: false
                },
                end_time: {
                    type: DataTypes.TIME,
                    allowNull: false
                },
                event_status: {
                    type: DataTypes.ENUM,
                    values: [...Object.values(EventStatus)]
                }
            },
            { sequelize, tableName: "events" }
        );
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(event_id){
        return this.findByPk(event_id, { raw: true });
    }

    static updateById(body, event_id){
        return this.update(body, { where: { event_id }, raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }

    static deleteById(event_id){
        return this.destroy({ where: { event_id }, raw: true });
    }
}

module.exports = EventModel;