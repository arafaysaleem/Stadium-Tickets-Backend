const { Model } = require('sequelize');

class BrandModel extends Model {
    static snacksAlias = 'snacks';

    static init(sequelize, DataTypes) {
        return super.init(
            {
                brand_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                category_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING,
                    length: 50,
                    allowNull: false
                },
                logo_url: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            { sequelize, tableName: "brands" }
        );
    }

    static associate(models) {
        this.Snacks = this.hasMany(models.SnackModel, { foreignKey: 'brand_id', as: this.snacksAlias });
        this.belongsTo(models.CategoryModel, { foreignKey: 'category_id' });
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(id, category_id){
        return this.findOne({ where: { brand_id: id, category_id }, raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }
    
    static updateById(body, id, category_id){
        return this.update(body, { where: { brand_id: id, category_id }, raw: true });
    }

    static deleteById(id, category_id){
        return this.destroy({ where: { brand_id: id, category_id }, raw: true });
    }
}

module.exports = BrandModel;