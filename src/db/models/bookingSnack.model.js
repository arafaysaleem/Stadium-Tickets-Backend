const { Model } = require('sequelize');

class BookingSnackModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                b_snack_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                snack_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                booking_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "booking_snacks" }
        );
    }

    static associate(models) {
        this.Booking = this.belongsTo(models.EventBookingModel, { foreignKey: 'booking_id', as: 'booking' });
        this.Snack = this.belongsTo(models.SnackModel, { foreignKey: 'snack_id', as: 'snack' });
    }

    static deleteById(b_snack_id){
        return this.destroy({ where: { b_snack_id }, raw: true });
    }
}

module.exports = BookingSnackModel;