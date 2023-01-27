const { Model } = require('sequelize');

class SnackModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                snack_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                image_url: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                brand_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                price: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            { sequelize, tableName: "snacks" }
        );
    }

    static associate(models) {
        this.belongsTo(models.BrandModel, { foreignKey: 'brand_id' });
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(id, brand_id){
        return this.findOne({ where: { snack_id: id, brand_id }, raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }
    
    static updateById(body, id, brand_id){
        return this.update(body, { where: { snack_id: id, brand_id }, raw: true });
    }

    static deleteById(id, brand_id){
        return this.destroy({ where: { snack_id: id, brand_id }, raw: true });
    }
}

module.exports = SnackModel;