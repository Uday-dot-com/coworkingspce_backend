require("dotenv").config();
const { CONSTANTS, MESSAGES } = require("../../configs");
const { admin } = CONSTANTS.USER.roles;
const { bcrypt } = require("../../utilities");

module.exports = {
  up: async (queryInterface) => {
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const hash = await bcrypt.generatePassword(process.env.ADMIN_PASSWORD);
      return queryInterface.bulkInsert("AdminUser", [
        {
          firstName: "Super",
          lastName: "Admin",
          password: hash,
          userName: "super",
          email: process.env.ADMIN_EMAIL,
          role: admin,
          emailVerified: true,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      throw new Error(MESSAGES.ADMIN.credentialsNotFound);
    }
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("AdminUser", null, {});
  },
};
