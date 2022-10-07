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
                num_of_seats: {
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
        this.belongsTo(models.ZoneTypeModel, { foreignKey: 'z_type_id' });
        this.hasMany(models.ZoneResourceModel, { foreignKey: 'zone_id' });
        this.hasMany(models.ZoneSeatModel, { foreignKey: 'zone_id' });
    }
}

module.exports = new ZoneModel;