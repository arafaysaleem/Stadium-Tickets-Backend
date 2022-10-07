const { Model } = require('sequelize');
const { Roles } = require('../utils/enums/roles.enum');

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
}

module.exports = UserModel;