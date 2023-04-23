"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
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
      isBlocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      socialLinks: {
        type: DataTypes.JSON,
      },
      bannerImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
