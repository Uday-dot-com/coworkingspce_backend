const { MESSAGES } = require("../../../configs");
const adminRepository = require("../admin.repository");
const {
  NotFoundException,
  UnauthorizedException,
} = require("../../../helpers/errorResponse");
const { jwt, bcrypt, logger } = require("../../../utilities");

module.exports = async (email, password) => {
  logger.info("Admin-login-service function initiated");

  const admin = await adminRepository.findAdminByEmail(email);
  if (!admin) throw new NotFoundException(MESSAGES.ADMIN.invalidCredentials);

  if (admin) {
    if (!admin.isActive)
      throw new UnauthorizedException(MESSAGES.ADMIN.inactive);
  }

  const tokenPayload = {
    id: admin.id,
    role: admin.role,
  };
  console.log(tokenPayload);
  const validPassword = await bcrypt.verifyPassword(password, admin.password);

  if (!validPassword)
    throw new UnauthorizedException(MESSAGES.ADMIN.invalidCredentials);
  const accessToken = jwt.generateAccessToken(tokenPayload);
  const refreshToken = jwt.generateRefreshToken(tokenPayload);

  const responsePayload = {
    ...tokenPayload,
    firstName: admin.firstName,
    lastName: admin.lastName,
    email: admin.email,
    profilePicUrl: admin.profilePicUrl,
    accessToken,
    refreshToken,
  };
  logger.info("Admin-login-service function ended");
  return responsePayload;
};
