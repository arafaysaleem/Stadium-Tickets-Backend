const { Model } = require('sequelize');
const { BookingStatus } = require('../../utils/enums/bookingStatus.enum');

class BookingParkingSpaceModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                b_p_space_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                space_number: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                space_row: {
                    type: DataTypes.STRING,
                    length: 1,
                    allowNull: false
                },
                p_floor_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                booking_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "booking_parking_spaces" }
        );
    }

    static associate(models) {
        this.Booking = this.belongsTo(models.EventBookingModel, { foreignKey: 'booking_id', as: 'booking' });
        this.ParkingFloor = this.belongsTo(models.ParkingFloorModel, { foreignKey: 'p_floor_id', as: 'parking_floor' });
    }

    static findAllForParkingFloor(p_floor_id){
        return this.findAll({
            where: { p_floor_id },
            attributes: ['b_p_space_id', 'space_number', 'space_row'],
            raw: true,
            include: [
                {
                    association: this.Booking,
                    as: this.Booking.as,
                    attributes: [],
                    required: true,
                    where: {
                        status: [BookingStatus.Confirmed, BookingStatus.Reserved]
                    }
                }
            ]
        });
    }

    static deleteById(b_p_space_id){
        return this.destroy({ where: { b_p_space_id }, raw: true });
    }
}

module.exports = BookingParkingSpaceModel;