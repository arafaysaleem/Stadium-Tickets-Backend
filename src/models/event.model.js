const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const EventModel = sequelize.define('events', {
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
    });

    return EventModel;
};