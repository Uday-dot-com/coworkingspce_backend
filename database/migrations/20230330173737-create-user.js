"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
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
      isBlocked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      socialLinks: {
        type: Sequelize.JSON,
      },
      bannerImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Users");
  },
};
