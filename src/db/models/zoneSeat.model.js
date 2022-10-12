const { Model } = require('sequelize');
const { SeatTypes } = require('../../utils/enums/seatTypes.enum');

class ZoneSeatModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                z_seat_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                seat_number: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                seat_row: {
                    type: DataTypes.STRING,
                    length: 2,
                    allowNull: false
                },
                type: {
                    type: DataTypes.ENUM,
                    values: [...Object.values(SeatTypes)]
                },
                zone_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "zone_seats" }
        );
    }

    static associate(models) {
        this.belongsTo(models.ZoneModel, { foreignKey: 'zone_id' });
    }
}

module.exports = ZoneSeatModel;