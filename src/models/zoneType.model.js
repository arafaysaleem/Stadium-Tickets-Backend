const { Model } = require('sequelize');

class ZoneTypeModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                z_type_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                type: {
                    type: DataTypes.STRING,
                    length: 15,
                    allowNull: false
                },
                price: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "zone_types" }
        );
    }

    static associate(models) {
        this.hasMany(models.ZoneModel, { foreignKey: 'z_type_id'});
    }
}

module.exports = new ZoneTypeModel;