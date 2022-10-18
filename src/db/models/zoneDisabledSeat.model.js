const { Model } = require('sequelize');
const { DisabledSeatType } = require('../../utils/enums/disabledSeatType.enum');

class ZoneDisabledSeatModel extends Model {
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
                    values: [...Object.values(DisabledSeatType)]
                },
                zone_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "zone_disabled_seats" }
        );
    }

    static associate(models) {
        this.belongsTo(models.ZoneModel, { foreignKey: 'zone_id' });
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(id){
        return this.findByPk(id, { raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }
    
    static updateById(body, id){
        return this.update(body, { where: { z_seat_id: id }, raw: true });
    }

    static deleteById(id){
        return this.destroy({ where: { z_seat_id: id }, raw: true });
    }
}

module.exports = ZoneDisabledSeatModel;