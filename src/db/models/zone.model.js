const { Model } = require('sequelize');

class ZoneModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                zone_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    length: 50,
                    allowNull: false
                },
                seats_per_row: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                num_of_rows: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                color_hex_code: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    length: 7
                },
                z_type_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "zones" }
        );
    }

    static associate(models) {
        this.Type = this.belongsTo(models.ZoneTypeModel, { foreignKey: 'z_type_id', as: 'type' });
        this.Resources = this.hasMany(models.ZoneResourceModel, { foreignKey: 'zone_id', as: 'resources' });
        this.DisabledSeats = this.hasMany(models.ZoneDisabledSeatModel, { foreignKey: 'zone_id', as: 'disabled_seats' });
    }

    static findAllByFilters(filters){
        return this.findAll({
            where: {...filters},
            // include: { all: true, nested: true }, // includes all association for this model and their nested models (recursively)
            include: [
                {
                    association: this.Type,
                    as: this.Type.as,
                    required: true,
                    attributes: ['z_type_id', 'type', 'price']
                },
                {
                    association: this.DisabledSeats,
                    as: this.DisabledSeats.as,
                    attributes: ['z_seat_id', 'seat_number', 'seat_row', 'type']
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
                        association: this.Type,
                        as: this.Type.as,
                        required: true,
                        attributes: ['z_type_id', 'type', 'price']
                    },
                    {
                        association: this.DisabledSeats,
                        as: this.DisabledSeats.as,
                        attributes: ['z_seat_id', 'seat_number', 'seat_row', 'type']
                    }
                ]
            }
        );
    }

    static updateById(body, id){
        return this.update(body, { where: { zone_id: id }, raw: true });
    }

    static createNew(body){
        return this.create(body,
            {
                raw: true,
                include: [
                    {
                        association: this.DisabledSeats,
                        as: this.DisabledSeats.as
                    },
                    {
                        association: this.Resources,
                        as: this.Resources.as
                    }
                ]
            }
        );
    }

    static deleteById(id){
        return this.destroy({ where: { zone_id: id }, raw: true });
    }
}

module.exports = ZoneModel;