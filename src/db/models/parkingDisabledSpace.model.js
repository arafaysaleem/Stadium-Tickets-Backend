const { Model } = require('sequelize');
const { DisabledSpaceType } = require('../../utils/enums/disabledSpaceType.enum');

class ParkingDisabledSpaceModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                p_space_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                space_number: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                space_row: {
                    type: DataTypes.STRING,
                    length: 2,
                    allowNull: false
                },
                type: {
                    type: DataTypes.ENUM,
                    values: [...Object.values(DisabledSpaceType)]
                },
                p_floor_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "parking_disabled_spaces" }
        );
    }

    static associate(models) {
        this.belongsTo(models.ParkingFloorModel, { foreignKey: 'p_floor_id' });
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(id, p_floor_id){
        return this.findOne({
            where: {
                p_space_id: id,
                p_floor_id
            },
            raw: true
        });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }
    
    static updateById(body, id, p_floor_id){
        return this.update(body, { where: { p_space_id: id, p_floor_id }, raw: true });
    }

    static deleteById(id, p_floor_id){
        return this.destroy({ where: { p_space_id: id, p_floor_id }, raw: true });
    }
}

module.exports = ParkingDisabledSpaceModel;