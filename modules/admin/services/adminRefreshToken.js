const { MESSAGES, CONSTANTS } = require('../../../configs');
const { UnauthorizedException } = require('../../../helpers/errorResponse');
const userRepository = require('../../user/user.repository');
const { jwt } = require('../../../utilities');

module.exports = async (token) => {
    token = token.split(' ')[1];

    if (!token) throw new UnauthorizedException(MESSAGES.MIDDLEWARE.authorization.missingToken);

    const decoded = await jwt.verifyToken(token, CONSTANTS.JWT.tokenSource.refreshToken);

    const existingAdmin = await userRepository.findUserById(decoded.id);

    if (!existingAdmin) throw new NotFoundException(MESSAGES.USER.notFound);

    if (existingAdmin.isBlocked) throw new UnauthorizedException(MESSAGES.USER.blocked);

    const tokenPayload = {
        id: existingAdmin.id,
        role: existingAdmin.role,
    };

    const accessToken = jwt.generateAccessToken(tokenPayload);
    const refreshToken = jwt.generateRefreshToken(tokenPayload);

    const responsePayload = {
        accessToken,
        refreshToken,
    };

    return responsePayload;
};
