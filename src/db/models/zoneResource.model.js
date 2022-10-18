const { Model } = require('sequelize');
const { ResourceType } = require('../../utils/enums/resourceType.enum');

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
                },
                type: {
                    type: DataTypes.ENUM,
                    values: [...Object.values(ResourceType)]
                }
            },
            { sequelize, tableName: "zone_resources" }
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
        return this.update(body, { where: { resource_id: id }, raw: true });
    }

    static deleteById(id){
        return this.destroy({ where: { resource_id: id }, raw: true });
    }
}

module.exports = ZoneResourceModel;