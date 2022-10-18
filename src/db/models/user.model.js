const { Model } = require('sequelize');
const { Role } = require('../../utils/enums/role.enum');

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
                    values: [...Object.values(Role)]
                }
            },
            { sequelize, tableName: "users" }
        );
    }

    static findAllByFilters(filters){
        return this.findAll({ where: {...filters}, raw: true });
    }

    static findById(id){
        return this.findByPk(id, { raw: true });
    }

    static findByEmail(email){
        return this.findOne({ where: { email }, raw: true });
    }

    static updateById(body, id){
        return this.update(body, { where: { user_id: id }, raw: true });
    }

    static createNew(body){
        return this.create(body, { raw: true });
    }

    static deleteById(id){
        return this.destroy({ where: { user_id: id }, raw: true });
    }
}

module.exports = UserModel;