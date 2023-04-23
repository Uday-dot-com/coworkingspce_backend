"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AdminUser", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING(20),
      },
      profilePicUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emailVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AdminUser");
  },
};
