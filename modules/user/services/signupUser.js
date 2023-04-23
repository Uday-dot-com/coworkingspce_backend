const { MESSAGES, CONSTANTS } = require("../../../configs");
const { BadRequestException } = require("../../../helpers/errorResponse");
const userRepository = require("../user.repository");
const { jwt, logger } = require("../../../utilities");
require("dotenv").config();

const { admin } = CONSTANTS.USER.roles;
const { bcrypt } = require("../../../utilities");

const { User } = require("../../../database/models");
module.exports = async (body) => {
  logger.info("userSignup-service function initiated");
  const { firstName, lastName, email, password, phone, role } = body;

  const existingEmail = await userRepository.findUserByEmail(email);
  if (existingEmail) {
    throw new BadRequestException(MESSAGES.USER.isUserEmailExists);
  }
  const hash = await bcrypt.generatePassword(password);

  const createdUser = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
    phone,
    role,
  });

  logger.info("userSignup-service function ended");

  return createdUser;
};
