const { Model } = require('sequelize');
const { Roles } = require('../../utils/enums/roles.enum');

class UserModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                user_id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                full_name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                role: {
                    type: DataTypes.ENUM,
                    values: [...Object.values(Roles)]
                }
            },
            { sequelize, tableName: "users" }
        );
    }

    static async findAllByFilters(filters = {}){
        return await this.findAll({ where: {...filters}, raw: true });
    }

    static async findById(id){
        return await this.findByPk(id, { raw: true });
    }

    static async findByEmail(email){
        return await this.findOne({ where: { email }, raw: true });
    }

    static async updateById(body, id){
        return await this.update(body, { where: { user_id: id }, raw: true });
    }

    static async createNew(body){
        return await this.create(body, { isNewRecord: true, raw: true });
    }

    static async deleteById(id){
        return await this.destroy({ where: { user_id: id }, raw: true });
    }
}

module.exports = UserModel;