const { Model } = require('sequelize');

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
                    values: ['open', 'closed']
                }
            },
            { sequelize, tableName: "events" }
        );
    }

    static associate(models) {
        
    }
}

module.exports = EventModel;