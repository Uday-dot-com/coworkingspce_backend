const { MESSAGES, CONSTANTS } = require('../../../configs');
const { UnauthorizedException } = require('../../../helpers/errorResponse');
const userRepository = require('../user.repository');
const { jwt, logger } = require('../../../utilities');

module.exports = async (token) => {
    token = token.split(' ')[1];

    if (!token) throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.missingToken);

    const decoded = await jwt.verifyToken(token, CONSTANTS.JWT.tokenSource.refreshToken);

    const existingUser = await userRepository.findUserById(decoded.id);

    if (!existingUser) throw new NotFoundException(MESSAGES.USER.notFound);

    if (existingUser.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    const tokenPayload = {
        id: existingUser.id,
        role: existingUser.role,
    };

    const accessToken = jwt.generateAccessToken(tokenPayload);
    const refreshToken = jwt.generateRefreshToken(tokenPayload);

    const responsePayload = {
        accessToken,
        refreshToken,
    };

    return responsePayload;
};
