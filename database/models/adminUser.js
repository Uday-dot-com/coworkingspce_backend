"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdminUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdminUser.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      profilePicUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      emailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "AdminUser",
    }
  );
  return AdminUser;
};
