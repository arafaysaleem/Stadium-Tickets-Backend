const { Model } = require('sequelize');

class CategoryModel extends Model {
    static brandsAlias = 'brands';

    static init(sequelize, DataTypes) {
        return super.init(
            {
                category_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    length: 50,
                    allowNull: false
                }
            },
            { sequelize, tableName: "categories" }
        );
    }

    static associate(models) {
        this.Brands = this.hasMany(models.BrandModel, { foreignKey: 'category_id', as: this.brandsAlias });
    }

    static findAllByFilters(filters){
        return this.findAll({
            where: {...filters},
            // include: { all: true, nested: true }, // includes all association for this model and their nested models (recursively)
            include: [
                {
                    association: this.Brands,
                    as: this.Brands.as
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
                        association: this.Brands,
                        as: this.Brands.as
                    }
                ]
            }
        );
    }

    static updateById(body, id){
        return this.update(body, { where: { category_id: id }, raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }

    static deleteById(id){
        return this.destroy({ where: { category_id: id }, raw: true });
    }
}

module.exports = CategoryModel;