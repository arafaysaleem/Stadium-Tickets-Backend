const { Model } = require('sequelize');

class BookingSeatModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                b_seat_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                person_name: {
                    type: DataTypes.STRING,
                    length: 50,
                    allowNull: false
                },
                identification_number: {
                    type: DataTypes.STRING,
                    length: 14,
                    allowNull: false
                },
                seat_number: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                seat_row: {
                    type: DataTypes.STRING,
                    length: 1,
                    allowNull: false
                },
                booking_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "booking_seats" }
        );
    }

    static associate(models) {
        this.belongsTo(models.EventBookingModel, { foreignKey: 'booking_id' });
    }

    static deleteById(b_seat_id){
        return this.destroy({ where: { b_seat_id }, raw: true });
    }
}

module.exports = BookingSeatModel;