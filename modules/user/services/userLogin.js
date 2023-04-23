const { MESSAGES } = require("../../../configs");
const userRepository = require("../user.repository");
const {
  NotFoundException,
  UnauthorizedException,
} = require("../../../helpers/errorResponse");
const { jwt, bcrypt, logger } = require("../../../utilities");

module.exports = async (email, password) => {
  logger.info("Admin-login-service function initiated");

  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new NotFoundException(MESSAGES.ADMIN.invalidCredentials);

  if (user) {
    if (!user.isActive)
      throw new UnauthorizedException(MESSAGES.ADMIN.inactive);
  }

  const tokenPayload = {
    email: user.email,
    role: admin.role,
  };
  console.log(tokenPayload);
  const validPassword = await bcrypt.verifyPassword(password, email.password);

  if (!validPassword)
    throw new UnauthorizedException(MESSAGES.ADMIN.invalidCredentials);
  const accessToken = jwt.generateAccessToken(tokenPayload);
  const refreshToken = jwt.generateRefreshToken(tokenPayload);

  const responsePayload = {
    ...tokenPayload,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,

    accessToken,
    refreshToken,
  };
  logger.info("User-login-service function ended");
  return responsePayload;
};
