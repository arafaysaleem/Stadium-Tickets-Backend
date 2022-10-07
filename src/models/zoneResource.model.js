const { Model } = require('sequelize');

class ZoneResourceModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                resource_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                resource_url: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                zone_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "zone_resources" }
        );
    }

    static associate(models) {
        this.belongsTo(models.ZoneModel, { foreignKey: 'zone_id' });
    }
}

module.exports = ZoneResourceModel;