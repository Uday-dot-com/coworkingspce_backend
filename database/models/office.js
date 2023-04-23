"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Office.belongsTo(models.Location, {
        foreignKey: "locationId",
        constrains: true,
        allowNull: true,
        onDelete: "cascade",
        onUpdate: "cascade",
        as: "locationData",
      });
    }
  }
  Office.init(
    {
      locationId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobile: DataTypes.INTEGER,
      logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Office",
    }
  );
  return Office;
};
