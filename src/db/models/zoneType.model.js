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
        this.hasMany(models.ZoneModel, { foreignKey: 'z_type_id', onDelete: 'RESTRICT' });
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(id){
        return this.findByPk(id, { raw: true });
    }

    static updateById(body, id){
        return this.update(body, { where: { z_type_id: id }, raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }

    static deleteById(id){
        return this.destroy({ where: { z_type_id: id }, raw: true });
    }
}

module.exports = ZoneTypeModel;