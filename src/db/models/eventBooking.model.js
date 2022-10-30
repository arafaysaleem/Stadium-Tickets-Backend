const { Model } = require('sequelize');
const { BookingStatus } = require('../../utils/enums/bookingStatus.enum');
const ZoneModel = require('./zone.model');

class EventBookingModel extends Model {
    static zoneAlias = 'zone';
    static bookingSeatsAlias = 'booking_seats';
    static bookingParkingSpacesAlias = 'booking_parking_spaces';

    static init(sequelize, DataTypes) {
        return super.init(
            {
                booking_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                amount_payable: {
                    type: DataTypes.DOUBLE,
                    length: 50,
                    allowNull: false
                },
                datetime: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                person_name: {
                    type: DataTypes.STRING,
                    length: 50,
                    allowNull: false
                },
                status: {
                    type: DataTypes.ENUM,
                    values: [...Object.values(BookingStatus)]
                },
                zone_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                event_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "event_bookings", createdAt: false }
        );
    }

    static associate(models) {
        this.belongsTo(models.EventModel, { foreignKey: 'event_id' });
        this.Zone = this.belongsTo(models.ZoneModel, { foreignKey: 'zone_id', as: this.zoneAlias });
        this.BookingSeats = this.hasMany(models.BookingSeatModel, { foreignKey: 'booking_id', as: this.bookingSeatsAlias });
        this.BookingParkingSpaces = this.hasMany(models.BookingParkingSpaceModel, { foreignKey: 'booking_id', as: this.bookingParkingSpacesAlias });
    }

    static findAllByFilters(filters){
        return this.findAll({
            where: {...filters},
            // include: { all: true, nested: true }, // includes all association for this model and their nested models (recursively)
            include: [
                {
                    association: this.Zone,
                    as: this.Zone.as,
                    required: true,
                    attributes: ['z_type_id', 'name'],
                    include: [
                        {
                            association: ZoneModel.Type,
                            as: ZoneModel.Type.as,
                            required: true,
                            attributes: ['z_type_id', 'type', 'price']
                        }
                    ]
                },
                {
                    association: this.BookingSeats,
                    as: this.BookingSeats.as,
                    required: true,
                    attributes: ['b_seat_id', 'seat_number', 'seat_row', 'person_name', 'identification_number']
                },
                {
                    association: this.BookingParkingSpaces,
                    as: this.BookingParkingSpaces.as,
                    attributes: ['b_space_id', 'space_number', 'space_row', 'floor_number']
                }
            ]
        });
    }

    static findAllForZone(zone_id){
        return this.findAll({
            where: {
                zone_id,
                status: [BookingStatus.Confirmed, BookingStatus.Reserved]
            },
            attributes: ['booking_id'],
            include: [
                {
                    association: this.BookingSeats,
                    as: this.BookingSeats.as,
                    attributes: ['b_seat_id', 'seat_number', 'seat_row']
                }
            ]
        });
    }

    static findById(id){
        return this.findByPk(id,
            {
                // include: { all: true, nested: true }, // includes all association for this model and their nested models (recursively)
                include: [
                    {
                        association: this.Zone,
                        as: this.Zone.as,
                        required: true,
                        attributes: ['z_type_id', 'name'],
                        include: [
                            {
                                association: ZoneModel.Type,
                                as: ZoneModel.Type.as,
                                required: true,
                                attributes: ['z_type_id', 'type', 'price']
                            }
                        ]
                    },
                    {
                        association: this.BookingSeats,
                        as: this.BookingSeats.as,
                        required: true,
                        attributes: ['b_seat_id', 'seat_number', 'seat_row', 'person_name', 'identification_number']
                    },
                    {
                        association: this.BookingParkingSpaces,
                        as: this.BookingParkingSpaces.as,
                        attributes: ['b_space_id', 'space_number', 'space_row', 'floor_number']
                    }
                ]
            }
        );
    }

    static updateById(body, booking_id){
        return this.update(body, { where: { booking_id }, raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }

    static deleteByFilters(filters){
        return this.destroy({ where: { ...filters }, raw: true });
    }
}

module.exports = EventBookingModel;