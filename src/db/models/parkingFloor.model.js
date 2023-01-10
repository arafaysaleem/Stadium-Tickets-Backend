const { Model } = require('sequelize');

class ParkingFloorModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                p_floor_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                floor_number: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                spaces_per_row: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                num_of_rows: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "parking_floors" }
        );
    }

    static associate(models) {
        this.DisabledSpaces = this.hasMany(models.ParkingDisabledSpaceModel, { foreignKey: 'p_floor_id', as: 'disabled_spaces' });
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(id){
        return this.findByPk(id, { raw: true }
        );
    }

    static updateById(body, id){
        return this.update(body, { where: { p_floor_id: id }, raw: true });
    }

    static createNew(body){
        return this.create(body,
            {
                raw: true,
                include: [
                    {
                        association: this.DisabledSpaces,
                        as: this.DisabledSpaces.as
                    }
                ]
            }
        );
    }

    static deleteById(id){
        return this.destroy({ where: { p_floor_id: id }, raw: true });
    }
}

module.exports = ParkingFloorModel;